const Email = require('email-templates');
const mailer = require('../Utils/mailer.js');
const db = require('../Models/index');
const asyncHandler = require('../Middleware/async');
const sendEmail = require('../Utils/sendEmail');
const { errorResMsg, successResMsg } = require('../Utils/response');

exports.createSupport = async (req, res) => {
  const query = await db.Support.create(req.body);
  const data = await query;
  const message = `Hello ${req.body.name}, We wish to inform you that your message has been recieved and will be processed. One of our customer respresentatives will be in touch soon. Thanks. \n You can also contact us on our other channnels /`;

  const locals = { name: 'New User', siteName: 'Codemoto' };
  mailer
    .sendMail(
      'no-reply@codemoto.io',
      req.body.email,
      'Welcome!',
      'signup',
      locals,
    )
    .then(
      () => {
        console.log('sent');
      },
      (err) => {
        return res.status(500).send({ msg: err.message });
      },
    )
    .catch((err) => {
      console.log(err);
    });
};
