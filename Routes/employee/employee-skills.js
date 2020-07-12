/* eslint-disable comma-dangle */
const express = require('express');
const { authorize } = require('../../Middleware/index');
const Role = require('../../Middleware/role');
const { EmployeeSkills } = require('../../Utils/validators/employee-skills');

const router = express.Router();
const {
  viewAllSkills,
  addSkill,
  editSkill,
  deleteSkill,
} = require('../../Controllers/employee/employee-skills');

// view all skills for an individual
router.get('/:employee_id/skill', authorize(Role.Employee), viewAllSkills);
// add skills for an employee
router.post(
  '/skill',
  authorize(Role.Employee),
  EmployeeSkills.validateSKills,
  addSkill,
);
// update an employee skill
router.patch(
  '/:employee_id/skill/:id',
  authorize(Role.Employee),
  EmployeeSkills.validateSKills,
  editSkill,
);
// delete an employee skill
router.delete('/:employee_id/skill/:id', authorize(Role.Employee), deleteSkill);

module.exports = router;
