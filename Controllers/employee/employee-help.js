const model = require('../../Models/index');
const { validateRequest } = require('../../Utils/request-body-validator');
const { errorResMsg, successResMsg } = require('../../Utils/response');

/**
 * @desc Employee post help
 * @route     POST /api/v1/help
 * @access    Private - Employee
 */

exports.employeePostHelp = (req, res, next) => {
  validateRequest(req, res);
  const { message } = req.body;
  const { userId } = req.body;
  // eslint-disable-next-line consistent-return
  (async () => {
    try {
      const save = {
        message,
        user_id: userId,
      };
      if (message == null || userId == null) {
        return errorResMsg(res, 422, 'Field cannot be blank');
      }
      const user = await model.Help.create(save);
      const data = {
        message: 'Message created successfully',
        createdOn: user.createdAt,
      };
      return successResMsg(res, 201, data);
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  })();
};
