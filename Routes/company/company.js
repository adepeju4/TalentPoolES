/* eslint-disable comma-dangle */
const express = require('express');
const { authorize } = require('../../Middleware/index');
const Role = require('../../Middleware/role');
const {
  allCategories,
  updateCategory,
  createCategory,
  deleteCategory,
  getCategoryById,
} = require('../../Controllers/company/company-category');

const router = express.Router();

// route to create company category
router.post(
  '/category',
  authorize([Role.Admin, Role.SuperAdmin]),
  createCategory,
);

// route to fetch all company categories
router.get(
  '/category',
  authorize(),
  allCategories,
);

// update route by id
// ajibadeabd@gmail.com created bu abdullah
router.patch(
  '/category/:category_id',
  authorize([Role.Admin, Role.SuperAdmin]),
  updateCategory,
);

// delete route by id by @rotimi
router.delete(
  '/category/:category_id',
  authorize([Role.Admin, Role.SuperAdmin]),
  deleteCategory,
);

// get a category by id
// @sahmie
router.get(
  '/category/:category_id',
  authorize([Role.Admin, Role.SuperAdmin]),
  getCategoryById,
);

module.exports = router;
