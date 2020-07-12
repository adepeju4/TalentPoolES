/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const model = require('../../Models');

const { successResMsg, errorResMsg } = require('../../Utils/response');

const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.TALENT_POOL_DEV_URL
    : process.env.TALENT_POOL_FRONT_END_URL;

const sendEmail = require('../../Utils/sendEmail');
const { message } = require('../../Utils/team-invite-template');

exports.sendInvite = async (req, res) => {
  const { userId, userTypeId } = req.user;
  const { email } = req.body;

  if (!userTypeId) return errorResMsg(res, 400, 'Profile must be created!');
  try {
    // Check if user exists and is an employee
    const user = await model.User.findOne({
      where: { email, role_id: 'ROL-EMPLOYEE' },
    });
    if (!user) {
      return errorResMsg(res, 404, 'User does not exist or is not an employee');
    }

    const employee = await model.Employee.findOne({
      where: { user_id: user.user_id },
    });

    // Get employer details
    const employer = await model.Employer.findOne({
      where: { user_id: userId },
    });

    // Team specific actions
    const team = await model.Team.findOne({
      where: { employer_id: userTypeId },
    });
    const teamName = team ? team.Team_name : employer.employer_name;
    const teamData = {
      Team_name: teamName,
      employee_id: employee.employee_id,
      employer_id: userTypeId,
    };

    // Check if employee is in the team
    const isInTeam = await model.Team.findOne({
      where: { employer_id: userTypeId, employee_id: employee.employee_id },
    });
    const teamResult = isInTeam
      ? errorResMsg(
          res,
          409,
          'Employee is already in or has been invited to this team',
        )
      : await model.Team.create(teamData);

    // Send email to user
    const inviteLink = `${URL}/team/confirm/?referralCode=${userTypeId}&employee=${employee.employee_id}`;
    try {
      await sendEmail({
        email,
        subject: `${employer.employer_name} has invited you to join the team on TalentPool`,
        message: await message(inviteLink),
      });
    } catch (err) {
      return errorResMsg(res, 400, 'Invite link not sent');
    }

    const data = {
      message: 'Invite link sent',
      data: { inviteLink, team: teamResult },
    };
    return successResMsg(res, 200, data);
  } catch (err) {
    return errorResMsg(res, 500, 'Internal server error');
  }
};

exports.verifyInvite = async (req, res) => {
  const { referralCode, employee } = req.query;
  try {
    const doesExist = await model.Team.findOne({
      where: { employee_id: employee, employer_id: referralCode },
    });
    if (!doesExist) {
      return errorResMsg(
        res,
        404,
        "Employee has not been invited to team or team doesn't exist",
      );
    }

    await model.Team.update(
      { status: 'Accepted' },
      { where: { employee_id: employee, employer_id: referralCode } },
    );
    return successResMsg(res, 200, { inviteStatus: 'Accepted' });
  } catch (err) {
    return errorResMsg(res, 500, 'Internal server error');
  }
};

// Get employees invited but not have not accepted the invite
exports.viewInvites = async (req, res, next) => {
  try {
    const data = [];
    const { userTypeId } = req.user;

    // Get all pending employees in the team
    const employee = await model.Team.findAll({
      where: { employer_id: userTypeId, status: 'Pending' },
    });

    // Find data of each employee
    for (const singleEmployee of employee) {
      const user = await model.Employee.findOne({
        where: { employee_id: singleEmployee.dataValues.employee_id },
      });
      const { email } = await model.User.findOne({
        where: { user_id: user.user_id },
      });
      data.push({
        userId: user.user_id,
        employeeId: singleEmployee.dataValues.employee_id,
        name: `${user.dataValues.first_name} ${user.dataValues.last_name}`,
        email,
      });
    }
    successResMsg(res, 200, data);
  } catch (err) {
    next(err);
  }
};

exports.teamMembers = async (req, res, next) => {
  try {
    const data = [];
    const { userTypeId } = req.user;
    // const { userTypeId } = req.body;
    const employee = await model.Team.findAll({
      where: { employer_id: userTypeId },
    });

    // Find data of each employee
    for (const singleEmployee of employee) {
      const user = await model.Employee.findOne({
        where: { employee_id: singleEmployee.dataValues.employee_id },
      });
      const { email } = await model.User.findOne({
        where: { user_id: user.user_id },
      });
      data.push({
        userId: user.user_id,
        employeeId: singleEmployee.dataValues.employee_id,
        name: `${user.dataValues.first_name} ${user.dataValues.last_name}`,
        email,
        status: `${singleEmployee.dataValues.status}`,
      });
    }
    successResMsg(res, 200, data);
  } catch (err) {
    next(err);
  }
};

exports.removeEmployee = async (req, res) => {
  try {
    const { employee_id } = req.body;

    const { userTypeId } = req.user;

	const record = await model.Team.findOne({
      where: { employer_id: userTypeId, employee_id },
    });
	if(!record){
	return errorResMsg(res, 404, 'User is not in team');
	}		
	
    await model.Team.destroy({
      where: { employer_id: userTypeId, employee_id },
      force: true,
    });
    return successResMsg(
      res,
      200,
      'Employee successfully removed from the team',
    );
  } catch (err) {
    
  }
};
