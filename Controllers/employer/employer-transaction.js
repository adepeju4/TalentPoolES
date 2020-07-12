/* eslint-disable camelcase */
/* eslint-disable consistent-return */
const { uuid } = require('uuidv4');
const models = require('../../Models/index');

const { Transaction } = models;
const { errorResMsg, successResMsg } = require('../../Utils/response');

/**
 * @description creates a new transaction
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @returns {object} An object containing the Transaction data from flutterwave
 */

// Create Transaction, @rotimi
const createTransaction = async (req, res) => {
  try {
    const transaction_id = uuid();
    const transactionBody = { ...req.body, transaction_id };
    const query = await Transaction.create(transactionBody);

    const data = await query;
    return successResMsg(res, 201, data);
  } catch (error) {
    return errorResMsg(res, 500, 'Something went wrong');
  }
};

// Get Transactions
const getTransactions = async (req, res) => {
  try {
    const query = await Transaction.findAll({});

    const data = await query;
    return successResMsg(res, 200, data);
  } catch (err) {
    return errorResMsg(res, 500, 'Something went wrong');
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const { transaction_id } = req.params;
    const query = await Transaction.destroy({
      where: { transaction_id },
    });

    const data = await query;
    if (!data) {
      errorResMsg(res, 404, 'Transaction not found');
    }

    // Success Report
    return successResMsg(res, 204, data);
  } catch (error) {
    errorResMsg(res, 500, 'Something went wrong');
  }
};

const restoreDeletedTransaction = async (req, res) => {
  try {
    const { package_id, employer_id } = req.body;
    const query = await Transaction.restore({
      where: {
        employer_id,
        package_id,
      },
      paranoid: false,
    });

    const toRestore = await query;
    if (!toRestore) {
      return errorResMsg(res, 404, 'Transaction does not exist');
    }

    const restored = await Transaction.findOne({
      where: {
        employer_id,
        package_id,
      },
    });

    const data = await restored;

    // Success Response
    return successResMsg(res, 200, data);
  } catch (error) {
    errorResMsg(res, error.status, error.message);
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  deleteTransaction,
  restoreDeletedTransaction,
};
