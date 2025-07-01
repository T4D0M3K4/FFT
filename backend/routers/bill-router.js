const express = require('express');
const billController = require('./../controllers/bill-controller');
const auth = require('./../middlewares/auth-middleware');
const role = require('../middlewares/role-middleware');
const billRouter = express.Router();

billRouter.route('/')
    .get(auth, billController.getAll)
    .post(auth, role('Admin'), billController.create)

billRouter.route('/:id')
    .get(auth, billController.getById)
    .put(auth, billController.update)
    .delete(auth, billController.remove)

module.exports = billRouter;