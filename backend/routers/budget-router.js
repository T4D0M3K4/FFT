const express = require('express');
const budgetController = require('./../controllers/budget-controller');
const auth = require('./../middlewares/auth-middleware');
const role = require('../middlewares/role-middleware');
const budgetRouter = express.Router();

budgetRouter.route('/')
    .get(auth, budgetController.getAll)
    .post(auth, budgetController.create)

budgetRouter.route('/:id')
    .get(auth, budgetController.getById)
    .put(auth, budgetController.update)
    .delete(auth, budgetController.remove)

module.exports = budgetRouter;