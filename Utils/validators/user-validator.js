const Joi = require('@hapi/joi');

const validateCreateUser = (body) => {
  const userSchema = Joi.object()
    .keys({
      firstName: Joi.string()
        .alphanum()
        .min(3)
        .max(60)
        .required(),
      lastName: Joi.string()
        .min(3)
        .max(60)
        .required(),
      password: Joi.string()
        .regex(
          /^(?:(?=.*?[A-Z])(?:(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=])|(?=.*?[a-z])(?:(?=.*?[0-9])|(?=.*?[-!@#$%^&*()_[\]{},.<>+=])))|(?=.*?[a-z])(?=.*?[0-9])(?=.*?[-!@#$%^&*()_[\]{},.<>+=]))[A-Za-z0-9!@#$%^&*()_[\]{},.<>+=-]{8,50}$/,
        )
        .min(8),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: false } })
        .required(),
      phone_no: Joi.string()
        .regex(/^[0]+[0-9]{10,15}$/)
        .min(5)
        .max(15)
        .required(),
    });

  return userSchema.validate(body);
};

module.exports = validateCreateUser;

// password regex
/**
 * Require the string to be 7 - 50 characters long
 * Allow the string to be contain A-Z, a-z, 0-9, and !@#$%^&*()_[\]{},.<>+=- characters
 * Require at least one character from any three of the following cases
 * English uppercase alphabet characters A–Z
 *    English lowercase alphabet characters a–z
 *    Base 10 digits 0–9
 *  Non-alphanumeric characters !@#$%^&*()_[]{},.<>+=-
 */
