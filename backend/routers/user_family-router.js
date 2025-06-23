const express = require('express');
const userFamilyController = require('./../controllers/user_family-controller');
const auth = require('./../middlewares/auth-middleware');
const userFamilyRouter = express.Router();

userFamilyRouter.route('')
    .post(auth, userFamilyController.create)

userFamilyRouter.route('/:id/families')
    .get(auth, userFamilyController.getFamiliesById)

userFamilyRouter.route('/:id/members')
    .get(auth, userFamilyController.getUsersById)

userFamilyRouter.route('/:familyId/:userId')
    .delete(auth, userFamilyController.remove)

module.exports = userFamilyRouter;