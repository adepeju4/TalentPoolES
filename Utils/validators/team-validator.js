const Joi = require('@hapi/joi');
const Format = require('./index');
const validator = require('../helpers/validator');

exports.validateRemoveEmployee = (req, res, next) => {
  const format = Joi.object().keys(
    {
      employee_id: Format.text,
    },
    {},
  );
  validator(format, req.body, res, next);
};

exports.validateInvite = (req, res, next) => {
  const format = Joi.object().keys(
    {
      email: Format.email,
    },
    {},
  );
  validator(format, req.body, res, next);
};
