const express = require('express');
const { authorize } = require('../../Middleware/index');
const Role = require('../../Middleware/role');

const {
  create,
  packageGet,
  packageUpdate,
  getAll,
  softDeletePackage,
  restoreDeletedPackage,
} = require('../../Controllers/employer/employer-package');
const { PackageValidator } = require('../../Utils/validators/package');

const router = express.Router();
router.post(
  '/',
  authorize([Role.Admin, Role.SuperAdmin]),
  PackageValidator.validatePackage,
  create,
);
router.get(
  '/:package_id',
  authorize([Role.Admin, Role.SuperAdmin]),
  packageGet,
);
router.patch(
  '/:package_id',
  authorize([Role.Admin, Role.SuperAdmin]),
  packageUpdate,
);
router.patch(
  '/:package_id/soft-delete',
  authorize([Role.Admin, Role.SuperAdmin]),
  softDeletePackage,
);
router.patch(
  '/:package_id/restore',
  authorize([Role.Admin, Role.SuperAdmin]),
  restoreDeletedPackage,
);
router.get(
  '/',
  authorize([Role.Admin, Role.SuperAdmin, Role.Employer]),
  getAll,
);
module.exports = router;
