const model = require('../../Models/index');
const { successResMsg } = require('../../Utils/response');

module.exports = {

  getEmployees: (req, res) => {
    (async () => {
      const employeeUsers = await model.User.findAll({
        where: {
          role_id: 'ROL-EMPLOYEE',
        },
      });

      return successResMsg(res, 200, employeeUsers);
    })();
  },
};
