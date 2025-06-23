const express = require('express');
const transactionController = require('./../controllers/transaction-controller');
const auth = require('./../middlewares/auth-middleware');
const role = require('../middlewares/role-middleware');
const transactionRouter = express.Router();

transactionRouter.route('/')
    .get(auth, role('Admin'), transactionController.getAll)
    .post(auth, transactionController.create)

transactionRouter.route('/:id')
    .get(auth, transactionController.getById)
    .put(auth, transactionController.update)
    .delete(auth, transactionController.remove)

module.exports = transactionRouter;