/* eslint-disable comma-dangle */
const express = require('express');
const { body } = require('express-validator');
const { authorize } = require('../Middleware/index');
const { UserValidation } = require('../Utils/validators/user-validator-new');

const {
  registerEmployer,
  adminLogin,
  postEmployeeLogin,
  postEmployerLogin,
  forgotPassword,
  resetPassword,
  resendVerificationLink,
  updatePassword,
  superAdminLogin,
} = require('../controllers/auth');

const {
  create,
  verifyEmail,
} = require('../controllers/employee/employee-signup');
const { post } = require('./views/employee/auth');

const router = express.Router();
// Employee Register
router.post(
  '/employee/register',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 8 })
      .withMessage(
        'Password should contain a minimum of 8 characters (upper and lowercase letters, numbers and at least one special character)',
      )
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_`,/@#\-"=:;~<>'\$%\^&\*\?\|\+\(\)\[\]\{}\.])(?=.{8,})/,
      )
      .withMessage(
        'Password should contain a minimum of 8 characters (upper and lowercase letters, numbers and at least one special character)',
      ),
  ],
  create,
);
// Employer Register
router.post(
  '/employer-signup',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 8 })
      .withMessage(
        'Password should contain a minimum of 8 characters (upper and lowercase letters, numbers and at least one special character)',
      )
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_`,/@#\-"=:;~<>'\$%\^&\*\?\|\+\(\)\[\]\{}\.])(?=.{8,})/,
      )
      .withMessage(
        'Password should contain a minimum of 8 characters (upper and lowercase letters, numbers and at least one special character)',
      ),
  ],
  registerEmployer,
);
// Admin Login
router.post('/admin-login', UserValidation.validateLogin, adminLogin);
router.post('/employer-login', UserValidation.validateLogin, postEmployerLogin);
// Employee Login
router.post('/employee/login', UserValidation.validateLogin, postEmployeeLogin);
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
router.post(
  '/email/verify/resend',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address')
      .normalizeEmail(),
  ],
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
