/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
const Joi = require('@hapi/joi');
const Format = require('./index');
const validator = require('../helpers/validator');

class PortfolioValidation {
  static validatePortfolio(req, res, next) {
    const format = Joi.object().keys(
      {
        title: Format.text,
        description: Format.text,
        link: Format.text,
        employee_id: Format.text,
      },
      {}
    );
    validator(format, req.body, res, next);
  }

  static updatePortfolio(req, res, next) {
    const format = Joi.object().keys(
      {
        title: Format.text,
        description: Format.text,
        link: Format.text,
      },
      {}
    );
    validator(format, req.body, res, next);
  }
}

module.exports.PortfolioValidation = PortfolioValidation;
