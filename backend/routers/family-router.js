const express = require('express');
const familyController = require('./../controllers/family-controller');
const auth = require('./../middlewares/auth-middleware');
const role = require('./../middlewares/role-middleware');
const familyRouter = express.Router();

familyRouter.route('')
    .get(auth, role('Admin'), familyController.getAll)
    .post(auth, familyController.create)

familyRouter.route('/:id')
    .get(auth, familyController.getById)
    .put(auth, familyController.update)
    .delete(auth, familyController.remove)

module.exports = familyRouter;