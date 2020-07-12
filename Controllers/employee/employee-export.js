/* eslint-disable no-unused-vars */
const asyncHandler = require('../../Middleware/async');
const Employee = require('../../Models/employee-model');
const downloadResource = require('../../Utils/json2csv');

// @desc    Admin: Export Employees as CSV
// @author  https://github.com/oyedotunsodiq045
// @route   GET /profiles-csv
// @access  Private
exports.getEmployees = asyncHandler(async (req, res, next) => {
  const fields = [
    {
      label: 'ID',
      value: 'id',
    },
    {
      label: 'AGE',
      value: 'age',
    },
    {
      label: 'DOB',
      value: 'dob',
    },
    {
      label: 'AVAILABILITY',
      value: 'avaliability',
    },
    {
      label: 'EMPLOYEE ACCESS ID',
      value: 'employee_access_id',
    },
    {
      label: 'EMPLOYEE CV',
      value: 'employee_cv',
    },
    {
      label: 'VIEWS',
      value: 'views',
    },
    {
      label: 'EMPLOYEE ID',
      value: 'employee_id',
    },
    {
      label: 'USER ID',
      value: 'user_id',
    },
    {
      label: 'REFEREE',
      value: 'referredBy',
    },
  ];

  const employees = await Employee.findAll();

  return downloadResource(res, 'employees-profile.csv', fields, employees);

  // export as json
  // res.status(200).json({
  //   success: true,
  //   data: employees
  // });
});
