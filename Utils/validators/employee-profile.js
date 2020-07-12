/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
const Joi = require('@hapi/joi');
const Format = require('./index');
const validator = require('../helpers/validator');

class EmployeeProfile {
  static validateProfile(req, res, next) {
    const format = Joi.object().keys(
      {
        firstName: Format.firstName,
        lastName: Format.lastName,
        userType: Format.text,
        hngId: Format.text,
        phoneNo: Format.phoneNo,
        pictureUrl: Format.urlOptional,
        age: Format.text,
        avaliability: Format.text,
        dateOfBirth: Format.text,
        employeeCv: Format.text,
        userId: Format.text,
      },
      {},
    );
    validator(format, req.body, res, next);
  }

  static updateProfile(req, res, next) {
    const format = Joi.object().keys(
      {
        age: Format.text,
        avaliability: Format.text,
        dob: Format.text,
        employee_cv: Format.text,
        views: Format.text,
      },
      {},
    );
    validator(format, req.body, res, next);
  }
}

module.exports.EmployeeProfile = EmployeeProfile;
