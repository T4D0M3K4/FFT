const express = require('express');
const multer = require('multer');
const billController = require('./../controllers/bill-controller');
const auth = require('./../middlewares/auth-middleware');
const role = require('../middlewares/role-middleware');
const billRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, file.originalname)
});

const upload = multer({storage});

billRouter.route('/')
    .get(auth, billController.getAll)
    .post(auth, role('Admin'), upload.single('bill'), billController.create)

billRouter.route('/:id')
    .get(auth, billController.getById)
    .put(auth, billController.update)
    .delete(auth, billController.remove)

billRouter.route('/:id/download')
    .get(auth, billController.download)
        
module.exports = billRouter;