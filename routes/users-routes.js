/*
 * Created on Fri Sep 25 2020
 * Copyright (c) 2020 Mark Ambrocio
 * CC BY-NC-SA 4.0
 */

const express = require('express');
const UserController = require('../controllers/userController');
const validateUserLoginRequest = require('../middlewares/valUserLoginReq');
// custom user middlewares
const validateRequestBody = require('../middlewares/validateRequestBody');
const createUserRequirements = require('../middlewares/registerUserReqs');
const validateUserEditRequirements = require('../middlewares/valUserEditReqs');
const restrict = require('../middlewares/auth_restrict');
const { catchErrors } = require('../middlewares/errorHandlers');

const router = express.Router();

router.post(
  '/',
  validateRequestBody(['username', 'password', 'email', 'userRole']),
  createUserRequirements,
  catchErrors(UserController.registerUser)
);
router.get('/:id', catchErrors(UserController.getUser));
router.post(
  '/auth/login',
  validateRequestBody(['email', 'password']),
  validateUserLoginRequest(),
  catchErrors(UserController.loginUser)
);
// must be signed in to edit or delete
router.put(
  '/:id',
  restrict(),
  validateUserEditRequirements,
  catchErrors(UserController.editUser)
);
router.delete('/:id', restrict(), catchErrors(UserController.deleteUser));

// logout
router.post('/logout', restrict(), catchErrors(UserController.logoutUser));

module.exports = router;
