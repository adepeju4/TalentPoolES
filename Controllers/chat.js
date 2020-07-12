/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
const Sequelize = require('sequelize');
const model = require('../Models/index');
const {
  errorResMsg,
  successResMsg
} = require('../Utils/response');

const {
  Op
} = Sequelize;

exports.chatUsers = async (req, res) => {
  try {
    const employer = await model.Employer.findAll({
      attributes: ['user_id', 'employer_name']
    });
    const employee = await model.Employee.findAll({
      attributes: ['user_id', 'first_name', 'last_name']

    });
    const admin = await model.Admin.findAll({
      attributes: ['user_id', 'first_name', 'last_name']
    });
    const data = {
      data: [...employer, ...employee, ...admin]
    };
    return successResMsg(res, 200, data);
  } catch (err) {
    console.log(err)
    return errorResMsg(res, 500, 'Opps!, An error occured');
  }
};

exports.chatMessages = (req, res) => {
  const {
    senDerId,
    receiVerID
  } = req.params;
  model.Chat.findAll({
      where: {
        // eslint-disable-next-line max-len
        [Op.or]: [{
            user_id: senDerId,
          },
          {
            user_id: receiVerID,
          },
          {
            receiver_id: senDerId,
          },
          {
            receiver_id: receiVerID,
          },
        ],
      },
    })
    .then((chatMessages) => {
      successResMsg(res, 200, chatMessages);
    })
    .catch(() => {
      errorResMsg(res, 500, 'An error occured');
    });
};