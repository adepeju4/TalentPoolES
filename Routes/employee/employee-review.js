const express = require('express');
const { authorize } = require('../../Middleware/index');
const Role = require('../../Middleware/role');

const {
  reviewCreate,
  getAllReviews,
  getReviewsById,
} = require('../../Controllers/employee/employee-review');
const { ReviewValidation } = require('../../Utils/validators/employee-review');

const router = express.Router();

router.post(
  '/review/:review_id',
  authorize(Role.Employee),
  ReviewValidation.validateReview,
  reviewCreate,
);
router.get('/review/:user_id', authorize(), getAllReviews);
router.get('/review/:review_id', authorize(), getReviewsById);

module.exports = router;
