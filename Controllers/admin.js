const model = require('../Models/index');
const { successResMsg } = require('../Utils/response');

module.exports = {

  getEmployers: (req, res) => {
    (async () => {
      const users = await model.User.findAll({
        where: {
          role_id: 'ROL-EMPLOYER',
        },
      });

      return successResMsg(res, 200, users);
    })();
  },
};
