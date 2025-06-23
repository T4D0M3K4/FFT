const express = require('express');
const userController = require('./../controllers/user-controller');
const auth = require('./../middlewares/auth-middleware');
const role = require('./../middlewares/role-middleware');
const userRouter = express.Router();

userRouter.route('')
    .get(auth,  role('Admin'), userController.getAll)
    .post(auth, role('Admin'), userController.create)

userRouter.route('/:id')
    .get(auth, userController.getById)
    .put(auth, userController.update)
    .delete(auth, userController.remove)

module.exports = userRouter;