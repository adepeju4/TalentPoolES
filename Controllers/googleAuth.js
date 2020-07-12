const bcrypt = require('bcryptjs');
const { uuid } = require('uuidv4');
const { OAuth2Client } = require('google-auth-library');
const model = require('../Models/index');

const client = new OAuth2Client(process.env.TALENT_POOL_GOOGLE_CLIENT_ID);
const jsonWT = require('../Utils/auth-token');
const {
  successResMsg,
  errorResMsg,
  sessionSuccessResMsg,
} = require('../Utils/response');

// Dev_tools
// eslint-disable-next-line operator-linebreak

exports.googleAuth = (req, res) => {
  // eslint-disable-next-line consistent-return
  (async () => {
    try {
      // verify user details from token
      const ticket = await client.verifyIdToken({
        idToken: req.body.token,
        audience: process.env.TALENT_POOL_GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      const checkUser = await model.User.findOne({
        where: {
          email: payload.email,
        },
      });

      const user = await checkUser;
      if (user) {
        let userTypeId = null;
        let verificationStatus = null;
        let isEmployer = false;
        if (user.role_id === 'ROL-EMPLOYEE') {
          const employee = await model.Employee.findOne({ where: { user_id: user.user_id } });
          if (employee) {
            userTypeId = employee.employee_id;
          }
        } else if (user.role_id === 'ROL-EMPLOYER') {
          isEmployer = true;
          const employer = await model.Employer.findOne({ where: { user_id: user.user_id } });
          if (employer) {
            userTypeId = employer.employer_id;
            verificationStatus = employer.verification_status;
          }
        }

        if (user.status === '0') {
          return errorResMsg(res, 401, 'User is not verified');
        }

        if (user.block) {
          return errorResMsg(res, 401, 'User Blocked!');
        }
        let data = {
          email: user.email,
          userId: user.user_id.toString(),
          userRole: user.role_id,
          userTypeId,
        };

        if (isEmployer) data = { ...data, verificationStatus };

        const token = jsonWT.signJWT(data);
        sessionSuccessResMsg(
          res,
          'login successful',
          200,
          token,
          user.user_id.toString(),
        );
      } else {
        // create user
        const password = process.env.TALENT_POOL_JWT_SECRET;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const data = {
          email: payload.email,
        };
        const token = jsonWT.signJWT(data);

        const userSave = {
          email: payload.email,
          password: hashedPassword,
          verification_token: token,
          role_id: req.body.role_id,
          user_id: uuid(),
          status: '1',
        };
        try {
          const userData = await model.User.create(userSave);

          successResMsg(res, 201, userData);
        } catch (error) {
          return errorResMsg(
            res,
            500,
            'An error occurred while creating user',
          );
        }
      }
    } catch (err) {
      return errorResMsg(res, 500, 'An error occurred');
    }
  })();
};
