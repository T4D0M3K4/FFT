const express = require('express');
const categoryController = require('./../controllers/category-controller');
const auth = require('./../middlewares/auth-middleware');
const role = require('./../middlewares/role-middleware');
const categoryRouter = express.Router();

categoryRouter.route('')
    .get(auth, role('Admin'), categoryController.getAll)
    .post(auth, role('Admin'), categoryController.create)

categoryRouter.route('/:id')
    .get(auth, role('Admin'), categoryController.getById)
    .put(auth, role('Admin'), categoryController.update)
    .delete(auth, categoryController.remove)

module.exports = categoryRouter;