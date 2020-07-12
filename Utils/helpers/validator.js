const { errorResMsg } = require('../response');
require('@hapi/joi');

// eslint-disable-next-line consistent-return
module.exports = async (schema, toValidate, res, next) => {
  try {
    await schema.validateAsync(toValidate);
    next();
  } catch (error) {
    return errorResMsg(res, 400, error.message);
  }
};
