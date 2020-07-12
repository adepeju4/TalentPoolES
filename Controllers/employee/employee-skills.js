/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable comma-dangle */
/* eslint-disable no-param-reassign */
const model = require('../../Models/index');
const { successResMsg, errorResMsg } = require('../../Utils/response');

exports.viewAllSkills = async (req, res) => {
  try {
    const { employee_id } = req.params;
    const query = await model.Skill.findAll({
      where: {
        employee_id,
      },
    });

    const data = await query;

    return successResMsg(res, 200, data);
  } catch (err) {
    return errorResMsg(res, 500, 'Something went wrong');
  }
};

// eslint-disable-next-line consistent-return
exports.addSkill = async (req, res) => {
  try {
    const query = await model.Skill.create(req.body);

    const data = await query;
    return successResMsg(res, 200, data);
  } catch (err) {
    return errorResMsg(res, 500, 'Something went wrong!');
  }
};

// eslint-disable-next-line consistent-return
exports.editSkill = async (req, res) => {
  try {
    const { id, employee_id } = req.params;

    await model.Skill.update(req.body, {
      where: { id, employee_id },
    });

    const query = await model.Skill.findOne({
      where: { id, employee_id },
    });

    const data = await query;
    if (!data) {
      return errorResMsg(res, 404, 'Skill not found');
    }

    successResMsg(res, 200, data);
  } catch (err) {
    return errorResMsg(res, 500, 'Something went wrong!');
  }
};

// eslint-disable-next-line consistent-return
exports.deleteSkill = async (req, res) => {
  try {
    const { id, employee_id } = req.params;

    const query = await model.Skill.findOne({
      where: { id, employee_id },
    });

    const data = await query;
    if (!data) {
      return errorResMsg(res, 404, 'Skill not found');
    }

    await model.Skill.destroy({
      where: {
        id,
        employee_id,
      },
      force: true,
    });

    return successResMsg(res, 204, data);
  } catch (err) {
    return errorResMsg(res, 500, 'Something went wrong!');
  }
};
