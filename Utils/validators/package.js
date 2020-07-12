/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
const Joi = require('@hapi/joi');
const Format = require('./index');
const validator = require('../helpers/validator');

class PackageValidator {
  static validatePackage(req, res, next) {
    const format = Joi.object().keys(
      {
        description: Format.text,
        package_name: Format.text,
        package_type: Format.text,
      },
      {},
    );
    validator(format, req.body, res, next);
  }
}

module.exports.PackageValidator = PackageValidator;
