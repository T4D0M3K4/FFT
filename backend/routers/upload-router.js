const express = require('express');
const uploadController = require('./../controllers/upload-controller');
const auth = require('./../middlewares/auth-middleware');
const upload = require('../middlewares/upload-middleware');
const uploadRouter = express.Router();

uploadRouter.route('')
    .post(auth, upload.single('file'), uploadController.uploadFile);

module.exports = uploadRouter;