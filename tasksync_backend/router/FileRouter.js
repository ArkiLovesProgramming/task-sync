const express = require('express');
const { upload, } = require('../controller/FileController')
const { uploadFile } = require('../middlewares/FileMiddleware')


const router = express.Router();

router.post('/upload',uploadFile.single('file'), upload);

module.exports = router