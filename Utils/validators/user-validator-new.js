/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
const Joi = require('@hapi/joi');
const Format = require('./index');
const validator = require('../helpers/validator');

class UserValidation {
  static validateUser(req, res, next) {
    const format = Joi.object().keys(
      {
        email: Format.email,
        password: Format.password,
      },
      {},
    );
    validator(format, req.body, res, next);
  }

  static validateLogin(req, res, next) {
    const format = Joi.object().keys(
      {
        email: Format.email,
        password: Format.password,
      },
      {},
    );
    validator(format, req.body, res, next);
  }

  static resendVerificationLink(req, res, next) {
    const format = Joi.object().keys(
      {
        email: Format.email,
      },
      {},
    );
    validator(format, req.body, res, next);
  }

  static updatePassword(req, res, next) {
    const format = Joi.object().keys(
      {
        oldPassword: Format.password,
        newPassword: Format.password,
      },
      {},
    );
    validator(format, req.body, res, next);
  }

  static resetPassword(req, res, next) {
    const format = Joi.object().keys(
      {
        password: Format.password,
      },
      {},
    );
    validator(format, req.body, res, next);
  }

  static validateAdmin(req, res, next) {
    const format = Joi.object().keys(
      {
        first_name: Format.firstName,
        last_name: Format.lastName,
        phone_number: Format.phoneNo,
        email: Format.email,
        password: Format.password,
      },
      {},
    );
    validator(format, req.body, res, next);
  }
}

module.exports.UserValidation = UserValidation;
