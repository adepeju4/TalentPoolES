const { validationResult } = require('express-validator');
const { errorResMsg } = require('./response');

// eslint-disable-next-line consistent-return
const validateRequest = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array();
    const errMsg = [];
    error.forEach((err) => errMsg.push(err.msg));
    return errorResMsg(res, 422, errMsg);
  }
};

module.exports.validateRequest = validateRequest;
