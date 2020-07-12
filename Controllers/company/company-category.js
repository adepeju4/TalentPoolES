/* eslint-disable consistent-return */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { uuid } = require('uuidv4');
const { successResMsg, errorResMsg } = require('../../Utils/response');
const db = require('../../Models');

const { Company_category } = db;

module.exports = {
  allCategories: (req, res) => {
    (async () => {
      const query = Company_category.findAll();
      const data = await query;
      if (!data) {
        return errorResMsg(res, 404, 'No company category found');
      }
      return successResMsg(res, 200, data);
    })();
  },

  updateCategory: (req, res) => {
    (async () => {
      const { category_id } = req.params;

      await Company_category.update(req.body, {
        where: { category_id },
      });

      const updatedCategory = await Company_category.findOne({
        where: { category_id },
      });

      const data = await updatedCategory;

      if (!data) {
        return errorResMsg(res, 404, 'Category not found');
      }
      return successResMsg(res, 200, data);
    })();
  },

  getCategoryById: (req, res) => {
    (async () => {
      const { category_id } = req.params;
      const query = Company_category.findOne({
        where: {
          category_id,
        },
      });
      const data = await query;
      if (!data) {
        return errorResMsg(
          res,
          404,
          `company category with id ${category_id} not found`,
        );
      }
      return successResMsg(res, 200, data);
    })();
  },

  createCategory: (req, res) => {
    (async () => {
      const categoryId = uuid();
      const { category_name } = req.body;

      const categoryExist = await Company_category.findOne({
        where: { category_name },
      });

      if (!categoryExist) {
        const data = await Company_category.create({
          category_id: categoryId,
          category_name: req.body.category_name,
          description: req.body.description,
        });

        return successResMsg(res, 201, data);
      }
      // Check if category already exist
      return errorResMsg(res, 400, 'Category already exist.');
    })();
  },

  // delete company category by id, implemented by @rotimi__
  deleteCategory: (req, res) => {
    (async () => {
      try {
        const { category_id } = req.params;
        const query = await Company_category.destroy({
          where: {
            category_id,
          },
          force: true,
        });

        const data = await query;

        if (!data) {
          return errorResMsg(res, 404, 'Profile not found');
        }
        return successResMsg(res, 204, data);
      } catch (err) {
        errorResMsg(res, 500, 'Something went wrong');
      }
    })();
  },
};
