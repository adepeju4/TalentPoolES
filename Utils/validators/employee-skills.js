/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
const Joi = require('@hapi/joi');
const Format = require('./index');
const validator = require('../helpers/validator');

class EmployeeSkills {
  static validateSKills(req, res, next) {
    const format = Joi.object().keys(
      {
        skill_description: Format.text,
        employee_id: Format.text,
      },
      {}
    );
    validator(format, req.body, res, next);
  }
}

module.exports.EmployeeSkills = EmployeeSkills;
