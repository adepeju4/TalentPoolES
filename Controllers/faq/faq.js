const model = require('../../Models');
const { errorResMsg, successResMsg } = require('../../Utils/response');

// Get FAQ By ID
exports.getfaq = async (req, res) => {
  try {
    const { id } = req.params;
    const query = await model.Faq.findOne({
      where: { id },
      attributes: ['question', 'answer', 'createdAt'],
    });

    const data = await query;

    if (!data) {
      return errorResMsg(res, 404, 'FAQ not found');
    }

    return successResMsg(res, 200, data);
  } catch (err) {
    return errorResMsg(res, 500, 'Something went wrong');
  }
};

// Creating FAQ /api/v1/faq/create
exports.createfaq = async (req, res) => {
  try {
    const query = await model.Faq.create(req.body);
    const data = await query;
    return successResMsg(res, 200, data);
  } catch (err) {
    return errorResMsg(res, 500, 'Something went wrong');
  }
};

// Update FAQ
exports.updateFaq = async (req, res) => {
  try {
    const { id } = req.params;

    await model.Faq.update(req.body, { where: { id } });

    const query = await model.Faq.findOne({ where: { id } });

    const data = await query;

    if (!data) {
      return errorResMsg(res, 404, 'Faq not found');
    }
    return successResMsg(res, 200, data);
  } catch (err) {
    return errorResMsg(res, 500, 'Something went wrong');
  }
};

// View All FAQs
exports.getAllFaqs = async (req, res) => {
  try {
    const query = await model.Faq.findAll({});

    const data = await query;

    return successResMsg(res, 200, data);
  } catch (error) {
    return errorResMsg(res, 500, 'An error occurred while getting FAQs');
  }
};
