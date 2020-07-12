/* eslint-disable comma-dangle */
const express = require('express');
const { authorize } = require('../Middleware/index');
const { UserValidation } = require('../Utils/validators/user-validator-new');

const {
  registerEmployer,
  userLogin,
  forgotPassword,
  resetPassword,
  resendVerificationLink,
  updatePassword,
  superAdminLogin,
} = require('../Controllers/auth');

const {
  create,
  verifyEmail,
} = require('../Controllers/employee/employee-signup');

const router = express.Router();
router.post('/employee-signup', UserValidation.validateUser, create);
router.post('/employer-signup', UserValidation.validateUser, registerEmployer);
router.post('/admin-login', UserValidation.validateLogin, userLogin);
router.post('/employer-login', UserValidation.validateLogin, userLogin);
router.post('/employee-login', UserValidation.validateLogin, userLogin);
router.post(
  '/forgot-password',
  UserValidation.resendVerificationLink,
  forgotPassword,
);
router.post('/superadmin-login', UserValidation.validateLogin, superAdminLogin);
router.put(
  '/reset-password/:resettoken',
  UserValidation.resetPassword,
  resetPassword,
);
router.put(
  '/email/verify/resend',
  UserValidation.resendVerificationLink,
  resendVerificationLink,
);
router.get('/email/verify', verifyEmail);
router.put(
  '/update-password/:userId',
  authorize(),
  UserValidation.updatePassword,
  updatePassword,
);
module.exports = router;
