// const db = require('../db');
const fsDe = require('fs').promises;
exports.createFolder =   (req, res) => {
    // Destructure all necessary fields from the request body
    const { FolderName, ParentFolderID = null, OwnerUserID, DepartmentId } = req.body;

    try {
        // Optional: Validate the existence of the ParentFolderID, OwnerUserID, and DepartmentId as needed
        if (ParentFolderID !== null) {
            const [parent] =   req.db.query('SELECT * FROM folders WHERE FolderID = ?', [ParentFolderID]);
            if (parent.length === 0) {
                return res.status(400).send({ message: "Parent folder does not exist." });
            }
        }

        // The Created and LastRevised timestamps will be automatically set by the database
        const [rows] =   req.db.query(
            'INSERT INTO folders (FolderName, ParentFolderID, OwnerUserID, DepartmentId) VALUES (?, ?, ?, ?)', 
            [FolderName, ParentFolderID, OwnerUserID, DepartmentId]
        );

        // Respond with the ID of the newly created folder and the provided details
        res.status(201).send({ FolderID: rows.insertId, FolderName, ParentFolderID, OwnerUserID, DepartmentId });
    } catch (error) {
        // Send a 500 Internal Server Error response if an error occurs
        res.status(500).send({ message: error.message });
    }
};


exports.getFolderById = async (req, res) => {

    try {
        const { id } = req.params;
        const [rows] = await req.db.query('SELECT * FROM folders WHERE id = ?', [id]);
        if (rows.length === 0) return res.status(404).json({ message: 'Folder not found' });
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
  
exports.updateFolder = async (req, res) => {
    try {
        const { id } = req.params; // The ID of the folder to update
        const { name } = req.body; // The new name for the folder
        // Update only the name column for the folder with the specified ID
        const [result] = await req.db.query('UPDATE folders SET name = ? WHERE id = ?', [name, id]);
        
        // Check if the folder was found and updated
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Folder not found' });
        }
        
        // Respond with the updated folder details
        res.status(200).json({ id, name });
    } catch (error) {
        // Handle any errors during the database operation
        res.status(500).json({ message: error.message });
    }
};


// exports.deleteFolder = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const [result] = await req.db.query('DELETE FROM folders WHERE id = ?', [id]);
//         if (result.affectedRows === 0) return res.status(404).json({ message: 'Folder not found' });
//         res.status(204).json({message: 'Folder Deleted Successfully'});
//         // res.status(200).json();
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
// // These functions will delete any and all children of the folder
// async function deleteFilesInFolder(folderId, db) {
//     await db.query('DELETE FROM files WHERE folder_id = ?', [folderId]);
// }

async function deleteFilesInFolder(folderId, db) {
    // First, retrieve all file paths in the folder from the database
    const [files] = await db.query('SELECT filepath FROM files WHERE folder_id = ?', [folderId]);

    // Iterate over each file and delete it from the filesystem
    for (const file of files) {
        try {
            await fsDe.unlink(file.filepath);
            console.log(`File deleted from filesystem: ${file.filepath}`);
        } catch (error) {
            // Handle specific error when file does not exist in the filesystem
            if (error.code === 'ENOENT') {
                console.warn(`File not found on filesystem, but will proceed to delete database record: ${file.filepath}`);
            } else {
                // For other errors, log and potentially halt the operation
                console.error('Error deleting file from filesystem:', error);
                throw error; // You might decide to continue instead of throwing, depending on your use case
            }
        }
    }

    // After all files in the folder have been attempted for deletion from the filesystem,
    // proceed to delete their records from the database.
    await db.query('DELETE FROM files WHERE folder_id = ?', [folderId]);
    console.log(`All files in folder ${folderId} deleted from database`);
}

async function deleteSubfoldersAndFiles(folderId, db) {
    // Fetch all subfolders
    const [subfolders] = await db.query('SELECT id FROM folders WHERE parent_id = ?', [folderId]);
    
    // Recursively delete each subfolder and its contents
    for (const subfolder of subfolders) {
        await deleteSubfoldersAndFiles(subfolder.id, db); // Recursive deletion for sub-subfolders
    }
    
    // Once all subfolders are handled, delete files directly under this folder
    await deleteFilesInFolder(folderId, db);

    // Now, it's safe to delete the folder itself since it's empty
    await db.query('DELETE FROM folders WHERE id = ?', [folderId]);
}

// This will be the final delete folder function
exports.deleteFolder = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete all files in the folder and its subfolders
        await deleteFilesInFolder(id, req.db);

        // Recursively delete all subfolders and their contents
        await deleteSubfoldersAndFiles(id, req.db);

        // Finally, delete the folder itself
        // const [result] = await req.db.query('DELETE FROM folders WHERE id = ?', [id]);
        // if (result.affectedRows === 0) return res.status(200).json({ message: 'Folder not found' });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addFileToFolder = async (req, res) => {
    const { file_id, folder_id } = req.body;
    try {
        await req.db.query('INSERT INTO file_folder_relationship (file_id, folder_id) VALUES (?, ?)', [file_id, folder_id]);
        res.status(201).send({ message: 'File added to folder successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.removeFileFromFolder = async (req, res) => {
    const { file_id, folder_id } = req.body;
    try {
        const [result] = await req.db.query('DELETE FROM file_folder_relationship WHERE file_id = ? AND folder_id = ?', [file_id, folder_id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Relationship not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.FetchAllFolderFiles = async (req, res) => {
    const { ParentFolderID } = req.params;

    try {
        // Fetching both folders and files within the specified parent folder using the promise-based query
        const [items] = await req.db.query(
            'SELECT * FROM items WHERE parent_id = ?', [ParentFolderID]
        );

        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

