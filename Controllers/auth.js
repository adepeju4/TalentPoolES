/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable operator-linebreak */
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { uuid } = require('uuidv4');
const model = require('../Models/index');
const jsonWT = require('../Utils/auth-token');
const asyncHandler = require('../Middleware/async');
const sendEmail = require('../Utils/sendEmail');
const {
  successResMsg,
  errorResMsg,
  sessionSuccessResMsg,
} = require('../Utils/response');

const catchAsync = require('../Utils/catchAsync');

// eslint-disable-next-line operator-linebreak
const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.TALENT_POOL_DEV_URL
    : process.env.TALENT_POOL_FRONT_END_URL;

exports.registerEmployer = (req, res, next) => {
  (async () => {
    try {
      // eslint-disable-next-line camelcase
      // encrypt password
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(req.body.password, salt);

      const userId = uuid();
      const userEmail = req.body.email;

      const basicInfo = {
        email: userEmail,
      };

      const token = jsonWT.signJWT(basicInfo);

      // check if email exist and create user
      const user = await model.User.findOne({
        where: { email: userEmail },
      });
      if (!user) {
        const userData = {
          email: userEmail,
          password: hashPassword,
          verification_token: token,
          role_id: 'ROL-EMPLOYER',
          user_id: userId,
        };
        await model.User.create(userData);

        // mail verification code to the user
        const verificationUrl = `${URL}/verify-email?verification_code=${token}`;

        const message = `<p> Hi, thanks for registering, kindly verify your email using this
    <a href ='${verificationUrl}'>link</a></p>`;

        // eslint-disable-next-line no-console
        try {
          await sendEmail({
            email: req.body.email,
            subject: 'Email verification',
            message,
          });
          const data = { message: 'Verification email sent!' };
          return successResMsg(res, 201, data);
        } catch (err) {
          if (!err.statusCode) {
            err.statusCode = 500;
          }
        }
      } else {
        return errorResMsg(
          res,
          403,
          'Someone has already registered this email',
        );
      }
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    }
  })();
};

exports.userLogin = (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body;
  let currentUser;
  model.User.findOne({ where: { email } })
    .then(async (user) => {
      if (!user) {
        return errorResMsg(
          res,
          404,
          'Incorrect login details, user does not exist',
        );
      }

      // Getting the user type ID
      let userTypeId = null;
      let verificationStatus = null;
      let isEmployer = false;
      if (user.role_id === 'ROL-EMPLOYEE') {
        const employee = await model.Employee.findOne({
          where: { user_id: user.user_id },
        });
        if (employee) {
          userTypeId = employee.employee_id;
        }
      } else if (user.role_id === 'ROL-EMPLOYER') {
        isEmployer = true;
        const employer = await model.Employer.findOne({
          where: { user_id: user.user_id },
        });
        if (employer) {
          userTypeId = employer.employer_id;
          verificationStatus = employer.verification_status;
        }
      }

      if (user.status === '0') {
        return errorResMsg(res, 401, 'User is not verified');
      }

      if (user.block) {
        return errorResMsg(res, 401, 'User Blocked!');
      }

      currentUser = user;
      bcrypt.compare(password, user.password).then((valid) => {
        if (!valid) {
          return errorResMsg(res, 401, 'Incorrect login details');
        }

        let data = {
          email: currentUser.email,
          userId: currentUser.user_id.toString(),
          userRole: currentUser.role_id,
          userTypeId,
        };

        if (isEmployer) data = { ...data, verificationStatus };

        const token = jsonWT.signJWT(data);

        sessionSuccessResMsg(
          res,
          'login successful',
          200,
          token,
          currentUser.user_id.toString(),
        );
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next(err);
    });
};

exports.adminLogin = (req, res, next) => {
  const { email } = req.body;
  const { password } = req.body;
  let currentUser;
  model.User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        return errorResMsg(
          res,
          404,
          'Incorrect login details, user does not exist',
        );
      }
      if (user.role_id !== 'ROL-ADMIN' && user.role_id !== 'ROL-SUPERADMIN') {
        return errorResMsg(res, 401, 'User is not an Admin!');
      }
      if (user.status === '0') {
        return errorResMsg(res, 401, 'User is not verified');
      }
      if (user.block) {
        return errorResMsg(res, 401, 'User Blocked!');
      }
      currentUser = user;
      bcrypt.compare(password, user.password).then((valid) => {
        if (!valid) {
          return errorResMsg(res, 401, 'Incorrect login details');
        }

        const data = {
          email: currentUser.email,
          userId: currentUser.user_id.toString(),
          userRole: currentUser.role_id,
        };
        const time = '1d';

        const token = jsonWT.signJWT(data, time);

        sessionSuccessResMsg(
          res,
          'login successful',
          200,
          token,
          currentUser.user_id.toString(),
        );
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const getResetPasswordToken = () => {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken, 'utf8')
    .digest('hex');

  // Set expire
  const resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return { resetToken, resetPasswordToken, resetPasswordExpire };
};

// @desc      Forgot password
// @route     POST /v1/auth/forgotpassword
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res) => {
  const user = await model.User.findOne({
    where: { email: req.body.email },
  });

  if (!user) {
    return errorResMsg(res, 404, 'User not found!');
  }

  // Get reset token
  const {
    resetToken,
    resetPasswordToken,
    resetPasswordExpire,
  } = getResetPasswordToken();

  await model.User.update(
    {
      resetPasswordToken,
      resetPasswordExpire,
    },
    {
      where: {
        email: req.body.email,
      },
    },
  );

  // Create reset url
  const resetUrl = `${URL}/password-reset?${resetToken}`;
  const message = `You are receiving this email because you (or someone else) has requested 
  the reset of your password. Please click this link to proceed: \n\n <a href=${resetUrl}>link</a> or 
  ignore if you are unaware of this action.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message,
    });

    const data = { message: 'Reset password email sent' };
    return successResMsg(res, 201, data);
  } catch (err) {
    // eslint-disable-next-line no-console
    user.reset_password_token = null;
    user.reset_password_expire = null;

    await user.save({ validateBeforeSave: false });

    return errorResMsg(res, 500, 'Email could not be sent');
  }
});

// @desc      Reset password
// @route     PUT /v1/auth/resetpassword/:resettoken
// @access    Public
exports.resetPassword = asyncHandler(async (req, res) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken, 'utf8')
    .digest('hex');

  const user = await model.User.findOne({
    where: {
      reset_password_token: resetPasswordToken,
    },
  });

  if (!user) {
    return errorResMsg(res, 400, 'Invalid token');
  }

  if (user.dataValues.resetPasswordExpire < Date.now()) {
    return errorResMsg(res, 400, 'Reset password token expired');
  }

  // hash password before saving
  const salt = bcrypt.genSaltSync(10);

  // Set new password
  user.password = bcrypt.hashSync(req.body.password, salt);
  user.reset_password_token = null;
  user.reset_password_expire = null;
  await user.save();

  const data = { message: 'Password changed successfully' };
  return successResMsg(res, 200, data);
});

exports.resendVerificationLink = async (req, res) => {
  // check if user exist
  const checkUser = await model.User.findOne({
    where: { email: req.body.email },
  });
  if (!checkUser) {
    return errorResMsg(res, 403, 'Invalid email');
  }

  if (checkUser.status === '1') {
    return errorResMsg(res, 401, 'This email has been verified');
  }

  const basicInfo = {
    email: checkUser.email,
  };

  // generate new verification_token
  const token = jsonWT.signJWT(basicInfo);
  checkUser.verification_token = token;
  checkUser.save();

  // mail verification code to the user
  const verificationUrl = `${URL}/verify-email?verification_code=${token}`;

  const message = `<p> Hello, you requested for the resend of your verification link. 
        Kindly verify your email </p><a href ='${verificationUrl}'>link</a>`;
  try {
    await sendEmail({
      email: checkUser.email,
      subject: 'Email verification',
      message,
    });
    const data = { message: 'Verification email re-sent!' };
    successResMsg(res, 201, data);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
};

exports.updatePassword = (req, res) => {
  (async () => {
    try {
      // eslint-disable-next-line camelcase
      const { oldPassword, newPassword } = req.body;
      const { userId } = req.params;
      const user = await model.User.findOne({ where: { user_id: userId } });
      if (!user) {
        return errorResMsg(res, 404, 'user does not exist');
      }

      bcrypt.compare(oldPassword, user.password).then(async (valid) => {
        if (!valid) {
          return errorResMsg(res, 401, 'Incorrect Password');
        }

        // hash password before saving
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(newPassword, salt);
        await model.User.update(
          {
            password: hashPassword,
          },
          {
            where: {
              user_id: userId,
            },
          },
        );
        const data = { message: 'Password sucessfully updated' };
        return successResMsg(res, 200, data);
      });
    } catch (err) {
      return errorResMsg(res, 500, 'Password could not be updated!');
    }
  })();
};

exports.superAdminLogin = (req, res, next) => {
  const { email, password } = req.body;
  // const { password } = req.body;
  let currentUser;
  model.User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        return errorResMsg(
          res,
          401,
          'Incorrect login details, user does not exist',
        );
      }
      if (user.role_id !== 'ROL-SUPERADMIN') {
        return errorResMsg(res, 401, 'User is not a Super Admin!');
      }
      if (user.status === '0') {
        return errorResMsg(res, 401, 'User is not verified');
      }
      if (user.block) {
        return errorResMsg(res, 401, 'User is blocked!');
      }
      bcrypt.compare(password, user.password).then((pass) => {
        if (!pass) {
          return errorResMsg(res, 401, 'Incorrect login details');
        }
        currentUser = user;
        const data = {
          email: currentUser.email,
          username: currentUser.username,
          userId: currentUser.user_id.toString(),
          userRole: currentUser.role_id,
        };

        const time = '1h';

        const token = jsonWT.signJWT(data, time);
        sessionSuccessResMsg(
          res,
          'login successful',
          200,
          token,
          currentUser.user_id.toString(),
        );
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
