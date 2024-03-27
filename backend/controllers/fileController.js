const fs = require('fs');
const fsUp = require('fs').promises;
const path = require('path');
const multer = require('multer');

const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir, { recursive: true });
}


// Set up storage engine with multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir); // Ensure this directory exists or is created dynamically
  },
  filename: function (req, file, cb) {
    // Using the original file name; consider generating a unique name to avoid overwrites
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Function to handle file upload
exports.uploadFile = upload.single('file'); // Middleware for single file upload

exports.handleUpload = async (req, res) => {
  if (!req.file) {
    return res.status(400).send('Please upload a file.');
  }

  try {
    const { originalname, path: filepath } = req.file;
    const { folder_id } = req.body;

    const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // Save file details to the database, including the current time
    const sql = 'INSERT INTO files (filename, filepath, folder_id, created_at) VALUES (?, ?, ?, ?)';
    await req.db.query(sql, [originalname, filepath, folder_id, currentTime]);
    
    console.log('File uploaded to database');
    res.send('File uploaded successfully.');
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Error uploading file');
  }
};
  
//   exports.updateFolder = async (req, res) => {
//     try {
//         const { id } = req.params; // The ID of the folder to update
//         const { name } = req.body; // The new name for the folder
//         // Update only the name column for the folder with the specified ID
//         const [result] = await req.db.query('UPDATE folders SET name = ? WHERE id = ?', [name, id]);
        
//         // Check if the folder was found and updated
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: 'Folder not found' });
//         }
        
//         // Respond with the updated folder details
//         res.status(200).json({ id, name });
//     } catch (error) {
//         // Handle any errors during the database operation
//         res.status(500).json({ message: error.message });
//     }
// };
exports.updateFileName = async (req, res) => {
  const { id } = req.params;
  const { newName } = req.body;

  if (!newName) {
      return res.status(400).send('New file name is required.');
  }

  try {
      // First, get the current filepath and filename from the database
      const [rows] = await req.db.query('SELECT filepath, filename FROM files WHERE id = ?', [id]);
      if (rows.length === 0) {
          return res.status(404).send('File not found.');
      }

      const oldFilePath = rows[0].filepath;
      const oldFileName = rows[0].filename;
      const newFilePath = oldFilePath.replace(oldFileName, newName);

      // Rename the file on the filesystem
      await fsUp.rename(oldFilePath, newFilePath);

      // Then, update the filename and filepath in the database
      const sql = 'UPDATE files SET filename = ?, filepath = ? WHERE id = ?';
      const [result] = await req.db.query(sql, [newName, newFilePath, id]);

      if (result.affectedRows === 0) {
          // Rollback file rename if database update fails
          await fsUp.rename(newFilePath, oldFilePath);
          return res.status(404).send('File not found or no change made.');
      }

      console.log('File name updated in database and filesystem');
      res.send('File name updated successfully.');
  } catch (error) {
      console.error('Error updating file name:', error);
      res.status(500).send('Error updating file name');
  }
};

exports.deleteFile = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Retrieve the filepath from the database
      const [rows] = await req.db.query('SELECT filepath FROM files WHERE id = ?', [id]);
      if (rows.length === 0) {
        return res.status(404).send('File not found.');
      }
  
      const filePath = rows[0].filepath;
  
      // Delete the file from the filesystem
      await fsUp.unlink(filePath).catch(error => {
        // Handle potential errors, like file not found on the filesystem
        console.error('Error deleting file from filesystem:', error);
        // Optionally, decide whether to proceed with DB deletion if file is not found on filesystem
      });
  
      // Remove the file's record from the database
      const [deleteResult] = await req.db.query('DELETE FROM files WHERE id = ?', [id]);
      if (deleteResult.affectedRows === 0) {
        // This case might not be reached due to earlier checks, but it's good to have for safety
        return res.status(404).send('File not found or already deleted.');
      }
  
      console.log('File deleted from database and filesystem');
      res.send('File deleted successfully.');
    } catch (error) {
      console.error('Error deleting file:', error);
      res.status(500).send(`Error deleting file: ${error.message}`);
    }
  };
  
