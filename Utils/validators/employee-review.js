const Joi = require('@hapi/joi');
const Format = require('./index');
const validator = require('../helpers/validator');

class ReviewValidation {
  static validateReview(req, res, next) {
    const format = Joi.object().keys(
      {
        rating: Format.text,
        message: Format.text,
        userId: Format.text,
      },
      {},
    );
    validator(format, req.body, res, next);
  }
}

module.exports.ReviewValidation = ReviewValidation;
