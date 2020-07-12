const express = require('express');
const {
  getUsers,
  blockEmployee,
  blockEmployer,
} = require('../../Controllers/admin/users');
const { authorize } = require('../../Middleware/index');
const Role = require('../../Middleware/role');

const router = express.Router();

// GET ALL USERS AS CSV
// @author  https://github.com/oyedotunsodiq045
router.route('/users-csv', authorize(Role.Admin)).get(getUsers);
router
  .route('/block-employee/:user_id', authorize([Role.Admin, Role.SuperAdmin]))
  .patch(blockEmployee);
router
  .route('/block-employer/:user_id', authorize([Role.Admin, Role.SuperAdmin]))
  .patch(blockEmployer);
module.exports = router;
