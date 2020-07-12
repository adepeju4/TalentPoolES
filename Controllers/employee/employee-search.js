const model = require('../../Models/index');
const { successResMsg, errorResMsg } = require('../../Utils/response');

const {
  Address, Employee, Employer, Team, Skill,
} = model;
const { Op } = model.Sequelize;

// Search by employer
exports.searchByEmployer = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0 || (!req.body.employer)) {
      return errorResMsg(res, 404, 'No employer specified, employer_id missing!');
    }
    const { employer } = req.body;
    const employerExists = await Employer.findOne({ where: { id: employer } });
    if (employerExists === null) {
      return errorResMsg(res, 404, 'employer does not exist');
    }
    const teams = await Team.findAll({
      where: {
        employer_id: employer,
      },
      attributes: ['employee_id'],
    });

    const teamList = teams.map((team) => team.employee_id);
    if (teamList.length === 0) {
      return errorResMsg(res, 404, 'employer has no employee');
    }
    try {
      const employees = await Employee.findAll({
        where: {
          employee_id: teamList,
        },
        include: 'User',
      });
      if (employees[0].length === 0) {
        return errorResMsg(res, 404, 'employer has no employee');
      }
      const dataResponse = {
        message: `Employees of employer with id=${employer}`,
        employees,
      };
      // Successful
      return successResMsg(res, 200, dataResponse);
    } catch (error) {
      return errorResMsg(res, 500, 'An error occurred while retrieving employees');
    }
  } catch (error) {
    return errorResMsg(res, 500, 'An error occured');
  }
};

// Search by location
exports.searchByLocation = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0 && (req.body.city || req.body.state)) {
      return errorResMsg(res, 400, 'no city or state specified!');
    }
    const { state } = req.body;
    const { city } = req.body;
    let place;
    let condition;

    if (city) {
      place = city;
      condition = city ? { city: { [Op.like]: `%${city}%` } } : null;
    } else {
      place = state;
      condition = state ? { state: { [Op.like]: `%${state}%` } } : null;
    }
    const addresses = await Address.findAll({
      where: condition,
      attributes: ['user_id'],
    });

    const addressList = addresses.map((address) => address.user_id);
    if (addressList.length === 0) {
      return errorResMsg(res, 404, `no employee found in ${place}`);
    }

    const employees = await Employee.findAll({
      where: {
        user_id: addressList,
      },
      include: 'User',
    });
    if (employees === null) {
      return errorResMsg(res, 404, `no employee found in ${place}`);
    }
    const dataResponse = ({
      message: `All employees that live in ${place}`,
      employees,
    });
    // Successful
    return successResMsg(res, 200, dataResponse);
  } catch (error) {
    return errorResMsg(res, 500, 'An error occurred');
  }
};

// Search by track
exports.searchByLanguageTrack = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0 && (req.body.language || req.body.track)) {
      return errorResMsg(res, 400, 'no language or track specified!');
    }
    const { track } = req.body;
    const { language } = req.body;
    let option;
    let condition;

    if (language) {
      option = language;
      condition = language ? { skill_description: { [Op.substring]: `%${language}%` } } : null;
    } else {
      option = track;
      condition = track ? { skill_description: { [Op.substring]: `%${track}%` } } : null;
    }
    const skills = await Skill.findAll({
      where: condition,
      attributes: ['employee_id'],
    });

    const skillList = skills.map((skill) => skill.employee_id);
    if (skillList.length === 0) {
      return errorResMsg(res, 404, `no employee found for ${option}`);
    }

    const employees = await Employee.findAll({
      where: {
        employee_id: skillList,
      },
      include: 'User',
    });
    if (employees === null) {
      return errorResMsg(res, 404, `no employee found for ${option}`);
    }
    const dataResponse = ({
      message: `All employees found for ${option}`,
      employees,
    });
    // Successful
    return successResMsg(res, 200, dataResponse);
  } catch (error) {
    return errorResMsg(res, 500, 'An error occurred');
  }
};

exports.searchByAvailability = async (req, res) => {
  try {
    if (req.body.availability === undefined) {
      return errorResMsg(res, 500, 'No availabilty criteria selected');
    }
    const { availability } = req.body;
    const employees = await Employee.findAll(
      {
        where:
        { avaliability: availability },
      },
    );
    if (Object.keys(employees).length === 0) {
      return errorResMsg(res, 404, `No employee found with availablity: ${availability}`);
    }
    return successResMsg(res, 200, employees);
  } catch (error) {
    return errorResMsg(res, 500, 'An error occurred while fulfilling your request');
  }
};
