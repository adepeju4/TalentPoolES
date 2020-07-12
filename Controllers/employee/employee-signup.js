/* eslint-disable nonblock-statement-body-position */
/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable curly */
const bcrypt = require('bcryptjs');
const { uuid } = require('uuidv4');

const model = require('../../Models');
const sendEmail = require('../../Utils/sendEmail');
const jsonWT = require('../../Utils/auth-token');

const { successResMsg, errorResMsg } = require('../../Utils/response');

// Dev_tools
const URL =
  process.env.NODE_ENV === 'development'
    ? process.env.TALENT_POOL_DEV_URL
    : process.env.TALENT_POOL_FRONT_END_URL;

// eslint-disable-next-line consistent-return
exports.create = async (req, res) => {
  try {
    const user = req.body;
    const { email } = user;
    const userExists = await model.User.findOne({ where: { email } });
    if (userExists !== null) {
      return errorResMsg(res, 403, 'Email already exist');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    // jwtoken
    const data = {
      email: user.email,
    };
    const token = jsonWT.signJWT(data);

    const userSave = {
      email: user.email,
      password: hashedPassword,
      verification_token: token,
      role_id: 'ROL-EMPLOYEE',
      user_id: uuid(),
    };

    // create new user and send verification mail
    try {
      await model.User.create(userSave);
      const verificationUrl = `${URL}/verify-email?verification_code=${token}`;

      const message = `<p> Hi, thanks for registering, kindly verify your email </p><a href ='${verificationUrl}'>link</a>`;
      await sendEmail({
        email: userSave.email,
        subject: 'Email verification',
        message,
      });

      const dataInfo = { message: 'Verification email sent!' };
      successResMsg(res, 201, dataInfo);
    } catch (error) {
      return errorResMsg(
        res,
        500,
        'An error occurred while creating user',
      );
    }
  } catch (error) {
    return errorResMsg(res, 500, 'An error occurred');
  }
};

// VERIFY EMAIL
// eslint-disable-next-line consistent-return
exports.verifyEmail = async (req, res) => {
  try {
    // eslint-disable-next-line camelcase
    const { verification_code } = req.query;
    const decoded = jsonWT.verifyJWT(verification_code);

    // check token expiration
    if (Date.now() <= decoded.exp + Date.now() + 60 * 60) {
      const user = await model.User.findOne({
        where: { email: decoded.email },
      });

      if (!user) return errorResMsg(res, 404, 'Email has not been registerd');
      if (user.status === '1')
        return errorResMsg(res, 401, 'This email has been verified');

      // update user status
      const updateUser = await model.User.update(
        { status: '1' },
        {
          where: {
            email: user.email,
          },
        },
      );

      const data = await updateUser;
      if (data[0] === 1) {
        return successResMsg(res, 200, 'Email verification successful');
      }
    } else {
      return errorResMsg(res, 400, 'Invalid or expired token');
    }
  } catch (error) {
    return errorResMsg(res, 500, 'An error occured');
  }
};