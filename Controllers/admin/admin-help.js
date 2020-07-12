const { Help } = require('../../Models');
const response = require('../../Utils/response');

exports.open = async (req, res) => {
  const { id } = req.params;
  let message;
  try {
    const ticket = await Help.update({ status: 'open' },
      { where: { id } });
    if (ticket[0] === 0) {
      message = 'This Ticket doesn\'t exist or has been deleted';
      return response.errorResMsg(res, 404, message);
    }

    message = 'This Ticket has been successfully opened';
    return response.successResMsg(
      res,
      200,
      message,
    );
  } catch (error) {
    message = 'An internal server error occured';
    return response.errorResMsg(
      res,
      500,
      message,
    );
  }
};

exports.escalate = async (req, res) => {
  const { id } = req.params;
  let message;
  try {
    const ticket = await Help.update({ status: 'escalate' }, { where: { id } });
    if (ticket[0] === 0) {
      message = "This Ticket doesn't exist or has been deleted";
      return response.errorResMsg(res, 404, message);
    }

    message = 'This Ticket has been successfully escalated';
    return response.successResMsg(res, 200, message);
  } catch (error) {
    message = 'An internal server error occured';
    return response.errorResMsg(res, 500, message);
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  let message;
  try {
    const ticket = await Help.destroy({ where: { id } });
    if (ticket === 0) {
      message = "This Ticket doesn't exist or has been deleted";
      return response.errorResMsg(res, 404, message);
    }

    message = 'This Ticket has been successfully deleted';
    return response.successResMsg(res, 200, message);
  } catch (error) {
    message = 'An internal server error occured';
    return response.errorResMsg(res, 500, message);
  }
};

exports.close = async (req, res) => {
  const { id } = req.params;
  let message;
  try {
    const ticket = await Help.update({ status: 'closed' }, { where: { id } });
    if (ticket[0] === 0) {
      message = "This Ticket doesn't exist or has been deleted";
      return response.errorResMsg(res, 404, message);
    }

    message = 'This Ticket has been successfully closed';
    return response.successResMsg(res, 200, message);
  } catch (error) {
    message = 'An internal server error occured';
    return response.errorResMsg(res, 500, message);
  }
};
