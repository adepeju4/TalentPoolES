/* eslint-disable no-unused-vars */
const asyncHandler = require('../../Middleware/async');
const model = require('../../Models/index');
const downloadResource = require('../../Utils/json2csv');

exports.getUsers = asyncHandler(async (req, res) => {
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
      label: 'DATE OF BIRTH',
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
      label: 'WEBSITE',
      value: 'website',
    },
    {
      label: 'USER ID',
      value: 'user_id',
    },
    {
      label: 'REFERRED BY',
      value: 'referred_by',
    },
    {
      label: 'CREATED AT',
      value: 'created_at',
    },
    {
      label: 'UPDATED AT',
      value: 'updated_at',
    },
    {
      label: 'DELETED AT',
      value: 'deleted_at',
    },
    {
      label: 'USER USER ID',
      value: 'user_user_id',
    },
  ];

  const users = await model.Employee.findAll({
    where: {
      verification_status: 'Approved',
    },
  });
  return downloadResource(res, 'export-verified-employees.csv', fields, users);
});
