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
      label: 'ORGANISATION NAME',
      value: 'organization_name',
    },
    {
      label: 'COMPANY CATEGORY ID',
      value: 'company_category_id',
    },
    {
      label: 'EMPLOYER TYPE',
      value: 'employer_type',
    },
    {
      label: 'EMPLOYER ID',
      value: 'employer_id',
    },
    {
      label: 'COMPANY PHONE',
      value: 'company_phone',
    },
    {
      label: 'COMPANY EMAIL',
      value: 'company_email',
    },
    {
      label: 'COMPANY ADDRESS',
      value: 'company_address',
    },
    {
      label: 'COMPANY LOGO',
      value: 'company_logo',
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
      label: 'COMPANY CATEGORY CATEGORY ID',
      value: 'company_category_category_id',
    },
    {
      label: 'USER USER ID',
      value: 'user_user_id',
    },
  ];

  const users = await model.Employer.findAll();

  return downloadResource(res, 'export-employers.csv', fields, users);
});
