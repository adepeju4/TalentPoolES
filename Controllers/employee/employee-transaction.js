/* eslint-disable consistent-return */
const models = require('../../Models/index');

const { Transaction } = models;
const { errorResMsg, successResMsg } = require('../../Utils/response');

/**
 * @description creates a new transaction
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @returns {object} An object containing the Transaction data from flutterwave
 */
const Create = async (req, res) => {
  let { active } = req.body;
  const {
    amount,
    duration,
    currency,
    planToken,
    transactionStatus,
    transactionID,
    employerID,
    packageID,
  } = req.body;
  active = transactionStatus.toLowerCase() === 'success';

  const response = await Transaction.create({
    amount,
    duration,
    currency,
    active,
    plan_token: planToken,
    transaction_status: transactionStatus,
    transaction_id: transactionID,
    employer_id: employerID,
    package_id: packageID,
  });

  if (response) {
    return successResMsg(res, 201, response);
  }
  return errorResMsg(res, 400, 'Bad request');
};

const GetAll = (req, res) => {
  Transaction.findAll({
    where: {
      employer_id: req.params.employer_id,
    },
  })
    .then((trans) => {
      if (trans === null) {
        return errorResMsg(res, 404, 'Transaction not found with employer id');
      }
      return successResMsg(res, 200, trans);
    })
    .catch(() => errorResMsg(res, 500, 'cannot fatch transaction'));
};

const Delete = async (req, res) => {
  const trans = await Transaction.findOne({ where: { id: res.params.id } });
  if (!trans) {
    return errorResMsg(res, 404, `bad request id: ${res.params.id} not found`);
  }
  if (trans.active) {
    return errorResMsg(res, 400, 'you cant delete an active plan');
  }
  await Transaction.destroy({
    where: {
      id: res.params.id,
      employer_id: res.params.employer_id,
    },
  })
    .then(() => successResMsg(res, 200, 'Transaction deleted successfully'))
    .catch(() => errorResMsg(res, 500, 'something went wrong!'));
};
module.exports = {
  Create,
  GetAll,
  Delete,
};
