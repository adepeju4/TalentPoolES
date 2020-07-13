/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable comma-dangle */
const express = require('express');

const { uuid } = require('uuidv4');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { authorize } = require('../../Middleware/index');
const Role = require('../../Middleware/role');

const upload = multer({ dest: `${__dirname}../../public/employeeimages` });

const { EmployeeProfile } = require('../../Utils/validators/employee-profile');
const { getEmployees } = require('../../Controllers/employee/employee-export');

const router = express.Router();

const models = require('../../Models');

const { successResMsg, errorResMsg } = require('../../Utils/response');

const attributes = [
  'id',
  'first_name',
  'last_name',
  'username',
  'location',
  'track',
  'phone_no',
  'image',
  'gender',
  'hng_id',
  'availability',
  'dob',
  'employee_cv',
  'views',
  'employee_id',
  'user_id',
  'referredBy',
  'user_type',
  'verification_status',
];

let image;

const uploadImageFunction = async (req, res) => {
  await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    (error, result) => {
      if (result) {
        image = result.secure_url;
        return image;
      }
      return errorResMsg(res, 400, 'Image Upload Failed!, Kindly retry');
    },
  );
  return image;
};

// CREATE A PROFILE
router.post(
  '/profile',
  authorize(Role.Employee),
  EmployeeProfile.validateProfile,
  async (req, res) => {
    const employeeId = uuid();
    const imageUrl = await uploadImageFunction(req, res);
    console.log('url to image', imageUrl);

    const {
      firstName,
      lastName,
      userType,
      hngId,
      userName,
      location,
      track,
      phoneNo,
      availability,
      dateOfBirth,
      employeeCv,
      userId,
    } = req.body;
    const newBody = {
      first_name: firstName,
      last_name: lastName,
      user_type: userType,
      phone_no: phoneNo,
      hng_id: hngId,
      username: userName,
      image: imageUrl,
      location,
      track,
      availability,
      dob: dateOfBirth,
      employee_id: employeeId,
      views: '0',
      employee_cv: employeeCv,
      user_id: userId,
    };

    try {
      // eslint-disable-next-line camelcase
      const { user_id } = newBody;
      const userQuery = await models.User.findOne({ where: { user_id } });
      if (!userQuery) {
        return errorResMsg(res, 400, 'Invalid user id');
      }

      // Check if user has a PROFILE
      const query = await models.Employee.findOne({ where: { user_id } });

      const userProfile = await query;
      // Check if profile does not already exist
      if (!userProfile) {
        // Create new profile
        const data = await models.Employee.create(newBody);

        return successResMsg(res, 201, data);
      }
      // Check if profile already exist
      return errorResMsg(
        res,
        400,
        'User already has a profile. Please, update existing profile',
      );
    } catch (err) {
      return errorResMsg(res, 500, err.message);
    }
  },
);

// GET AN EMPLOYEE PROFILE
// eslint-disable-next-line consistent-return
router.get('/profile/:employee_id', async (req, res) => {
  try {
    const { employee_id: employeeId } = req.params;

    const query = await models.Employee.findOne({
      where: { employee_id: employeeId },
      attributes,
    });

    const skillQuery = await models.Skill.findAll({
      where: { employee_id: employeeId },
    });

    const portfolioQuery = await models.Portfolio.findAll({
      where: { employee_id: employeeId },
    });

    const employee = await query;
    const skills = await skillQuery;
    const portfolios = await portfolioQuery;

    const data = { employee, skills, portfolios };

    if (!employee) {
      return errorResMsg(res, 404, 'Profile not found');
    }

    return successResMsg(res, 200, data);
  } catch (err) {
    return errorResMsg(res, 500, err.message);
  }
});

// GET AN EMPLOYEE PROFILE BY USERNAME
// eslint-disable-next-line consistent-return
router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;

    const query = await models.Employee.findOne({
      where: { username },
      attributes,
    });

    // eslint-disable-next-line camelcase
    const { employee_id } = await query;

    const skillQuery = await models.Skill.findAll({
      where: { employee_id },
    });

    const portfolioQuery = await models.Portfolio.findAll({
      where: { employee_id },
    });

    const employee = await query;
    const skills = await skillQuery;
    const portfolios = await portfolioQuery;

    const data = { employee, skills, portfolios };

    if (!employee) {
      return errorResMsg(res, 404, 'Profile not found');
    }

    return successResMsg(res, 200, data);
  } catch (err) {
    return errorResMsg(res, 500, err.message);
  }
});

// UPDATE AN EMPLOYEE PROFILE
// eslint-disable-next-line consistent-return
router.patch(
  '/profile/:employee_id',
  authorize(Role.Employee),
  async (req, res) => {
    try {
      if (!(req.body.employee_id || req.body.user_id)) {
        const { employee_id: employeeId } = req.params;
        // Update Profile
        let reqBody = req.body;
        if (req.files) {
          const imageUrl = await uploadImageFunction(req, res);
          reqBody = { image: imageUrl, ...req.body };
          console.log(reqBody);
        }

        await models.Employee.update(reqBody, {
          where: { employee_id: employeeId },
          plain: true,
        });

        // Get updated profile for return
        const updatedProfile = await models.Employee.findOne({
          where: { employee_id: employeeId },
          attributes,
        });

        const data = await updatedProfile;

        // Profile not found??
        if (!data) {
          return errorResMsg(res, 404, 'Profile not found');
        }
        // return updated data
        return successResMsg(res, 200, data);
      }
      return errorResMsg(
        res,
        400,
        'Bad Request! Please, try again with accepted entries!!!',
      );
    } catch (err) {
      console.log(err);

      return errorResMsg(res, 500, err.message);
    }
  },
);

// DELETE AN EMPLOYEE PROFILE
// eslint-disable-next-line consistent-return
router.delete(
  '/profile/:employee_id',
  authorize(Role.Employee),
  async (req, res) => {
    try {
      const { employee_id: employeeId } = req.params;
      const doc = await models.Employee.destroy({
        where: { employee_id: employeeId },
        force: true,
      });

      // Profile not found??
      if (!doc) {
        return errorResMsg(res, 404, 'Profile not found');
      }
      // Return response 204 [No Content]
      const message = 'profile deteted';
      return successResMsg(res, 200, { message });
    } catch (err) {
      return errorResMsg(res, 500, err.message);
    }
  },
);

// GET ALL EMPLOYEES PROFILE AS CSV
// @author  https://github.com/oyedotunsodiq045
router.route('/profiles-csv', authorize(Role.Admin)).get(getEmployees);

module.exports = router;
