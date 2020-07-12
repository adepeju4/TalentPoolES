/* eslint-disable comma-dangle */
const express = require('express');
const helpController = require('../../Controllers/admin/admin-help');
const { authorize } = require('../../Middleware/index');
const Role = require('../../Middleware/role');

const router = express.Router();

router.patch(
  '/help/:id/open',
  authorize([Role.Admin, Role.SuperAdmin]),
  helpController.open
);

router.delete(
  '/help/:id/delete',
  authorize([Role.Admin, Role.SuperAdmin]),
  helpController.delete
);

router.patch(
  '/help/:id/escalate',
  authorize([Role.Admin, Role.SuperAdmin]),
  helpController.escalate
);

router.patch(
  '/help/:id/close',
  authorize([Role.Admin, Role.SuperAdmin]),
  helpController.close
);

module.exports = router;
