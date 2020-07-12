/* eslint-disable camelcase */
const model = require('../../Models/index');
// const downloadResource = require('../../Utils/json2csv');
const { successResMsg, errorResMsg } = require('../../Utils/response');

// @desc    Admin: Verify User
// @author  https://github.com/siddhi523
// @route   PATCH /verify-employer
// @access  Private

exports.verifyEmployer = (req, res) => {
  (async () => {
    // fetch a user id from the url parameters
    const { employer_id: employerId } = req.params;

    // find a user with the user id and whose role id is an employee
    const user = await model.Employer.findOne({
      where: { employer_id: employerId },
    });
    if (user == null) {
      return errorResMsg(res, 404, `Employer with id: ${employerId}, does not exist`);
    }

    const {
      verification_status,
    } = req.body;

    const verify = {
      verification_status,
    };
    //    console.log(verify);
    const result = await model.Employer.update(verify, {
      where: { employer_id: employerId },
      returning: true,
      plain: true,
    });
    if (!result) return errorResMsg(res, 404, { message: 'employer verification status not updated' });

    await user.save(); // save recent changes
    return successResMsg(res, 200, { message: `employer with id: ${employerId}, is ${verification_status} ` }); // return success message
  })();
};
