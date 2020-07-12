/* eslint-disable comma-dangle */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const model = require('../../Models/index');
const { successResMsg, errorResMsg } = require('../../Utils/response');

const { Transaction, Package } = model;

exports.employerUpgrade = async (req, res) => {
  try {
    if (!req.body.package_id || !req.params.employer_id) {
      return errorResMsg(res, 400, 'no employer_id or package_id specified');
    }

    const { package_id } = req.body;
    const { employer_id } = req.params;
    const employerExists = await Transaction.findOne({
      where: {
        employer_id,
      },
    });

    if (employerExists === null) {
      return errorResMsg(
        res,
        404,
        'Employer not found. Probably employer has no previous transaction'
      );
    }

    const packageExists = await Package.findOne({
      where: {
        package_id,
      },
    });

    if (packageExists === null) {
      return errorResMsg(
        res,
        404,
        'Package not found. Ensure the package_id is correct'
      );
    }

    await Transaction.update(
      {
        package_id,
        updated_at: Date.now(),
      },
      { where: { employer_id } }
    );

    const dataResponse = { message: 'Employer upgraded successfully' };
    successResMsg(res, 200, dataResponse);
  } catch (err) {
    errorResMsg(res, 500, err.message);
  }
};
