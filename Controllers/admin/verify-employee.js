/* eslint-disable camelcase */
const model = require('../../Models/index');
const { successResMsg, errorResMsg } = require('../../Utils/response');

// @desc    Admin: Verify User
// @author  https://github.com/sahmie
// @route   PATCH /verify-employer
// @access  Private

exports.verifyEmployee = (req, res) => {
  (async () => {
    // fetch a user id from the url parameters
    const { employee_id: employeeId } = req.params;

    // find a user with the user id and whose role id is an employee
    const user = await model.Employee.findOne({
      where: { employee_id: employeeId },
    });
    if (user == null) {
      return errorResMsg(
        res,
        404,
        `Employee with id: ${employeeId}, does not exist`,
      );
    }

    // eslint-disable-next-line camelcase
    const { verification_status: verificationStatus } = req.body;

    const verify = {
      verification_status: verificationStatus,
    };

    //    console.log(verify);
    const result = await model.Employee.update(verify, {
      where: { employee_id: employeeId },
      returning: true,
      plain: true,
    });
    if (!result) {
      return errorResMsg(res, 404, {
        message: 'employee verification status not updated',
      });
    }

    await user.save(); // save recent changes
    return successResMsg(res, 200, {
      message: `employee with id: ${employeeId}, is ${verificationStatus} `,
    }); // return success message
  })();
};
