/* eslint-disable camelcase */
/* eslint-disable no-undef */
const model = require('../../Models/index');
const { errorResMsg, successResMsg } = require('../../Utils/response');

// eslint-disable-next-line consistent-return
exports.reviewCreate = (req, res) => {
  // eslint-disable-next-line consistent-return
  (async () => {
    const { review_id: reviewId } = req.params;
    const { userId } = req.body;
    if (!reviewId) {
      return errorResMsg(req, 404, 'review id missing in url params');
    }
    const user = await model.User.findOne({
      where: { user_id: userId },
    });
    if (!user) return errorResMsg(res, 404, `User with id: ${userId}, cannot be found`);
    model.Review.create({
      rating: req.body.rating,
      review_id: reviewId,
      message: req.body.message,
      user_id: userId,
    })
      .then((review) => {
        const data = {
          message: 'review created successfully',
          review_id: review.review_id,
          created_by_user_id: review.user_id,
          created_at: review.createdAt,
        };
        successResMsg(res, 201, data);
      })
      .catch(() => {
        errorResMsg(res, 500, 'cannot create review');
      });
  })();
};

exports.getAllReviews = (req, res) => {
  // eslint-disable-next-line consistent-return
  (async () => {
    const { user_id: userId } = req.params;
    model.Review.sync();
    model.Review.findAll({
      where: {
        user_id: userId,
      },
    })
      .then((reviews) => {
        const dataResponse = {
          message: `All Reviews by User with user id: ${userId}`,
          reviews,
        };
        return successResMsg(res, 200, dataResponse);
      })
      .catch(() => errorResMsg(res, 404, 'Review not found'))
      .catch(() => errorResMsg(res, 500, 'cannot fetch review'));
  })();
};

exports.getReviewsById = (req, res) => {
  // eslint-disable-next-line consistent-return
  (async () => {
    const { review_id: reviewId } = req.body;
    const { user_id: userId } = req.params;
    // console.log(user_id);

    if (!reviewId) {
      return errorResMsg(req, 404, 'review id missing in params');
    }

    model.Review.sync();
    model.Review.findAll({
      where: {
        [Op.and]: [
          { review_id: reviewId },
          { user_id: userId },
        ],
      },
    })
      .then((review) => {
        const dataResponse = {
          message: `Reviews by the id: ${review_id}`,
          review,
        };
        return successResMsg(res, 200, dataResponse);
      })
      .catch(() => errorResMsg(res, 404, 'Review not found'))
      .catch(() => errorResMsg(res, 500, 'cannot fetch review'));
  })();
};

// const getAllReview = (req, res) => {
//   const { user_id: userId } = req.params;
//   model.Review.sync();
//   model.Review.findAll({
//     where: {
//       user_id: userId,
//     },
//   })
//     .then((reviews) => {
//       const dataResponse = {
//         message: `All Reviews by User with user id: ${userId}`,
//         reviews,
//       };
//       return successResMsg(res, 200, dataResponse);
//     })
//     .catch(() => errorResMsg(res, 404, 'Review not found'))
//     .catch(() => errorResMsg(res, 500, 'cannot fetch review'));
// };
