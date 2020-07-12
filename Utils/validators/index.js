/* eslint-disable no-useless-escape */
/* eslint-disable newline-per-chained-call */
/* eslint-disable implicit-arrow-linebreak */
const Joi = require('@hapi/joi');

module.exports = {
  firstName: Joi.string()
    .min(3)
    .max(60)
    .required()
    .error(new Error('firstName is required')),
  lastName: Joi.string()
    .min(3)
    .max(60)
    .required()
    .error(new Error('lastName is required')),
  text: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: true },
    })
    .trim()
    .required(),
  status: Joi.string().valid('0', '1').required(),
  employerType: Joi.string().valid('Individual', 'Company').required(),
  roleId: Joi.string()
    .valid(
      'ROL-EMPLOYER',
      'ROL-EMPLOYEE',
      'ROL-SUPERADMIN',
      'ROL-ADMIN',
    )
    .required(),
  number: Joi.number().min(1).required(),
  nameOptional: Joi.string().alphanum().min(3).max(30).optional(),
  url: Joi.string().uri().required(),
  urlOptional: Joi.string().uri().optional(),
  array: Joi.array().required(),
  boolean: Joi.boolean().required(),
  json: Joi.object().required(),
  password: Joi.string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_`,/@#\-"=:;~<>'\$%\^&\*\?\|\+\(\)\[\]\{}\.])(?=.{8,})/,
    )
    .trim()
    .required()
    .min(1)
    .error(
      new Error(
        'Password should contain a minimum of 8 characters (upper and lowercase letters, numbers and at least one special character)',
      ),
    ),
  date: Joi.date().required(),
  phoneNo: Joi.string()
    .regex(/^[0]+[0-9]{10,15}$/)
    .required()
    .error(new Error('Phone number should be at least 11 digits')),
  stringOptional: Joi.string().trim().min(1).optional(),
  image: Joi.any()
    .meta({ swaggerType: 'file' })
    .required()
    .allow('')
    .description('image file'),
};
