const express = require('express');
const categoryController = require('./../controllers/category-controller');
const auth = require('./../middlewares/auth-middleware');
const role = require('./../middlewares/role-middleware');
const categoryRouter = express.Router();

categoryRouter.route('')
    .get(auth, categoryController.getAll)
    .post(auth, categoryController.create)

categoryRouter.route('/:id')
    .get(auth, categoryController.getById)
    .put(auth, role('Admin'), categoryController.update)
    .delete(auth, role('Admin'), categoryController.remove)

module.exports = categoryRouter;