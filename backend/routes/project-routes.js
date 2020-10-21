/*
 * Created on Fri Sep 25 2020
 * Copyright (c) 2020 Mark Ambrocio
 * CC BY-NC-SA 4.0
 */

const express = require('express');
const ProjController = require('../controllers/projectController');
const validateCreateProject = require('../middlewares/valProjCreateReq');
const restrict = require('../middlewares/auth_restrict');
const { catchErrors } = require('../middlewares/errorHandlers');
const valUserCanEdit = require('../middlewares/valUserCanEdit');

const router = express.Router();

router.get('/', catchErrors(ProjController.fetchAll));
router.get('/users/:userID', catchErrors(ProjController.fetchByUserID));
router.get('/:projectID', catchErrors(ProjController.fetchByID));

// need to be signed in as user
router.post(
  '/',
  restrict(),
  validateCreateProject(),
  catchErrors(ProjController.createProject)
);
router.put(
  '/:projectID',
  restrict(),
  valUserCanEdit(),
  validateCreateProject(),
  catchErrors(ProjController.editProject)
);

router.delete(
  '/:projectID',
  restrict(),
  valUserCanEdit(),
  catchErrors(ProjController.deleteProject)
);

module.exports = router;
