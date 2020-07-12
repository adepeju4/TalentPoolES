/* eslint-disable comma-dangle */
const express = require('express');
const Team = require('../Controllers/team/team-controller');
const teamValidation = require('../Utils/validators/team-validator');
const { authorize } = require('../Middleware/index');
const Role = require('../Middleware/role');

const router = express.Router();

router.post(
  '/invite',
  authorize(Role.Employer),
  teamValidation.validateInvite,
  Team.sendInvite,
);
router.patch('/confirm', authorize(Role.Employee), Team.verifyInvite);
router.get('/view-invites', authorize(Role.Employer), Team.viewInvites);
router.get('/view-team-members', authorize(Role.Employer), Team.teamMembers);

router.delete(
  '/remove-employee',
  authorize(Role.Employer),
  teamValidation.validateRemoveEmployee,
  Team.removeEmployee,
);
module.exports = router;
