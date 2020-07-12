const asyncHandler = require('../../Middleware/async');
const model = require('../../Models/index');
const downloadResource = require('../../Utils/json2csv');
const { successResMsg, errorResMsg } = require('../../Utils/response');

// @desc    Admin: Export registered users as CSV
// @author  https://github.com/oyedotunsodiq045
// @route   GET /users-csv
// @access  Private
exports.getUsers = asyncHandler(async (req, res) => {
  const fields = [
    {
      label: 'ID',
      value: 'id',
    },
    {
      label: 'STATUS',
      value: 'status',
    },
    {
      label: 'BLOCK',
      value: 'block',
    },
    {
      label: 'GENDER',
      value: 'gender',
    },
    {
      label: 'FIRST NAME',
      value: 'first_name',
    },
    {
      label: 'LAST NAME',
      value: 'last_name',
    },
    {
      label: 'AUTH ID',
      value: 'auth_id',
    },
    {
      label: 'PICTURE URL',
      value: 'picture_url',
    },
    {
      label: 'USER ID',
      value: 'user_id',
    },
    {
      label: 'EMAIL',
      value: 'email',
    },
    {
      label: 'PHONE NUMBER',
      value: 'phone_no',
    },
    {
      label: 'PASSWORD',
      value: 'password',
    },
    {
      label: 'GOOGLE ID',
      value: 'googleId',
    },
    {
      label: 'GITHUB ID',
      value: 'githubId',
    },
    {
      label: 'LINKEDIN ID',
      value: 'linkedinId',
    },
    {
      label: 'USERNAME',
      value: 'username',
    },
    {
      label: 'VERIFICATION TOKEN',
      value: 'verification_token',
    },
    {
      label: 'EMAIL VERIFIED AT',
      value: 'email_verified_at',
    },
    {
      label: 'ROLE ID',
      value: 'role_id',
    },
    {
      label: 'USER ID',
      value: 'user_id',
    },
    {
      label: 'RESET PASSWORD TOKEN',
      value: 'reset_password_token',
    },
    {
      label: 'RESET PASSWORD EXPIRE',
      value: 'reset_password_expire',
    },
  ];

  const users = await model.User.findAll();

  return downloadResource(res, 'users-profile.csv', fields, users);

  // export as json
  // res.status(200).json({
  //   success: true,
  //   data: users
  // });
});

// Admin block employee
exports.blockEmployee = (req, res) => {
  (async () => {
    // fetch a user id from the url parameters
    const { user_id: userId } = req.params;

    // find a user with the user id and whose role id is an employee
    const user = await model.User.findOne({
      where: { user_id: userId, role_id: 'ROL-EMPLOYEE' },
    });

    // return a 404 if a user isn't found
    if (user === null) {
      return errorResMsg(res, 404, `User with id: ${userId}, does not exist`);
    }

    if (user.block) {
      return successResMsg(res, 200, { message: 'user has been blocked' });
    }

    user.block = 1; // block user
    await user.save(); // save recent changes to the database
    return successResMsg(res, 200, {
      message: `User with username: ${user.username}, blocked`,
    }); // return a succesful response
  })();
};

// Admin Block Employer
exports.blockEmployer = (req, res) => {
  (async () => {
    // fetch a user id from the url parameters
    const { user_id: userId } = req.params;

    // find a user with the user id and whose role id is an employee
    const user = await model.User.findOne({
      where: { user_id: userId, role_id: 'ROL-EMPLOYER' },
    });

    // return a 404 if a user isn't found
    if (user === null) {
      return errorResMsg(res, 404, `User with id: ${userId}, does not exist`);
    }

    if (user.block) {
      return successResMsg(res, 200, { message: 'user has been blocked' });
    }
    user.block = 1; // block user
    await user.save(); // save recent changes to the database
    return successResMsg(res, 200, {
      message: `User with username: ${user.username}, blocked`,
    }); // return a succesful response
  })();
};
