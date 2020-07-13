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
        userName: Format.text,
        userType: Format.text,
        hngId: Format.text,
        phoneNo: Format.phoneNo,
        location: Format.text,
        track: Format.text,
        availability: Format.text,
        dateOfBirth: Format.text,
        employeeCv: Format.text,
        userId: Format.text,
      },
      {},
    );
    validator(format, req.body, res, next);
  }
}

module.exports.EmployeeProfile = EmployeeProfile;
