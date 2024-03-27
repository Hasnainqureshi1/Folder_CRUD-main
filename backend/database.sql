CREATE DATABASE IF NOT EXISTS file_manager;
USE file_manager;

-- Dropping existing tables if they exist
DROP TABLE IF EXISTS file_folder_relationship;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS folders;
DROP TABLE IF EXISTS files;

-- Creating the files table with the new schema
CREATE TABLE files (
    FileID INT AUTO_INCREMENT PRIMARY KEY,
    FileName VARCHAR(255) NOT NULL,
    FilePath VARCHAR(255) NOT NULL,
    Created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    OwnerUserID INT,
    DepartmentId INT,
    LastRevised TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FileType VARCHAR(255) NOT NULL
);

-- Creating the folders table with the new schema
CREATE TABLE folders (
    FolderID INT AUTO_INCREMENT PRIMARY KEY,
    FolderName VARCHAR(255) NOT NULL,
    ParentFolderID INT,
    OwnerUserID INT,
    DepartmentId INT,
    Created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    LastRevised TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ParentFolderID) REFERENCES folders(FolderID) ON DELETE CASCADE
);

-- Creating the items table
CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    type ENUM('file', 'directory') NOT NULL,
    parent_id INT,
    owner_id INT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES folders(FolderID) ON DELETE CASCADE
);

-- Creating the file_folder_relationship table
CREATE TABLE file_folder_relationship (
    file_id INT,
    folder_id INT,
    PRIMARY KEY (file_id, folder_id),
    FOREIGN KEY (file_id) REFERENCES files(FileID) ON DELETE CASCADE,
    FOREIGN KEY (folder_id) REFERENCES folders(FolderID) ON DELETE CASCADE
);
