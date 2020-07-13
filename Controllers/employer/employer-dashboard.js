const model = require('../../Models');
const { errorResMsg, successResMsg } = require('../../Utils/response');

// Get EMPLOYER DASHBOARD
exports.dashboard = async (req, res) => {
  try {
    const allEmployees = await model.Employee.count();

    const employeeContacted = await model.Team.count({
      where: {
        employer_id: req.body.employer_id,
      },
    });

    const employeeEmployed = await model.Team.count({
      where: {
        employer_id: req.body.employer_id,
        status: 'Accepted',
      },
    });

    const employer = await model.Employer.findOne({
      where: {
        employer_id: req.body.employer_id,
      },
    });

    const data = await [{ all_employee: allEmployees }, { employee_contacted: employeeContacted }, { employee_employed: employeeEmployed }, { employer_details: employer }];

    if (!data) {
      return errorResMsg(res, 404, 'Data not found');
    }

    return successResMsg(res, 200, data);
  } catch (err) {
    return errorResMsg(res, 500, 'Something went wrong');
  }
};