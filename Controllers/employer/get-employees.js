const model = require('../../Models/index');

const { Employee } = model;
const { errorResMsg, successResMsg } = require('../../Utils/response');

const getAllEmployees = async (req, res) => {
  // Employer verification goes here

  try {
    const query = await Employee.findAll({
      where: { verification_status: 'Approved' },
    });

    const data = await query;
    // Success Response
    return successResMsg(res, 200, data);
  } catch (error) {
    return errorResMsg(res, 500, 'An error occured');
  }
};

module.exports = {
  getAllEmployees,
};
