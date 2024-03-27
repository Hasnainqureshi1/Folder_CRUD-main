const express = require('express');
const router = express.Router();
const folderController = require('../controllers/folderController');

router.post('/create', folderController.createFolder);
router.get('/get/:id', folderController.getFolderById);
router.put('/update/:id', folderController.updateFolder);
router.delete('/delete/:id', folderController.deleteFolder);
router.post('/parent', folderController.FetchAllFolderFiles);
// router.put('/:id', folderController.updateFolderName);
// router.delete('/:id', folderController.deleteFolder);

module.exports = router;
