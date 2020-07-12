const express = require('express');
const { authorize } = require('../../Middleware/index');
const Role = require('../../Middleware/role');

const {
  createTransaction,
  getTransactions,
  deleteTransaction,
  restoreDeletedTransaction,
} = require('../../Controllers/employer/employer-transaction');

const router = express.Router();

router.post(
  '/transaction',
  authorize([Role.Admin, Role.SuperAdmin, Role.Employer]),
  createTransaction,
);

router.get(
  '/transaction',
  authorize([Role.Admin, Role.SuperAdmin, Role.Employer]),
  getTransactions,
);

router.get(
  '/transaction/:transaction_id/restore',
  authorize([Role.Admin, Role.SuperAdmin]),
  restoreDeletedTransaction,
);

router.delete(
  '/transaction/:transaction_id',
  authorize([Role.Admin, Role.SuperAdmin]),
  deleteTransaction,
);

module.exports = router;
