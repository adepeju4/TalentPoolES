const nodemailer = require('nodemailer');
const Email = require('email-templates');

const email = new Email({
  message: {
    from: 'support@talentpool.com',
  },
  // uncomment below to send emails in development/test env:
  send: true,
  transport: nodemailer.createTransport({
    host: process.env.TALENT_POOL_SMTP_HOST,
    port: process.env.TALENT_POOL_SMTP_PORT,
    auth: {
      user: process.env.TALENT_POOL_SMTP_USER,
      pass: process.env.TALENT_POOL_SMTP_PASSWORD,
    },
  }),
  views: {
    options: {
      extension: 'ejs', // <---- HERE
    },
  },
  preview: false,
});

module.exports = email;
