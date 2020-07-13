const Q = require('q');
const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');

module.exports = {
  _template: null,
  _transport: null,

  init(config) {
    const d = Q.defer();

    const emailTemplates = new EmailTemplates(
      config.emailTplsDir,
      (err, template) => {
        if (err) {
          return d.reject(err);
        }

        this._template = template;
        this._transport = nodemailer.createTransport({
          host: process.env.TALENT_POOL_SMTP_HOST,
          port: process.env.TALENT_POOL_SMTP_PORT,
          auth: {
            user: process.env.TALENT_POOL_SMTP_USER,
            pass: process.env.TALENT_POOL_SMTP_PASSWORD,
          },
        });
        return d.resolve();
      },
    );
    console.log('ran1');
    return d.promise;
    console.log('ran1');

  },
  send(from, to, subject, text, html) {
    const d = Q.defer();
    const params = {
      from,
      to,
      subject,
      text,
    };
    console.log('ran2');

    if (html) {
      params.html = html;
    }

    this._transport.sendMail(params, (err, res) => {
      if (err) {
        console.error(err);
        return d.reject(err);
      }
      return d.resolve(res);
    });

    return d.promise;
  },

  sendMail(from, to, subject, tplName, locals) {
    const d = Q.defer();
    const self = this;
    this.init({ emailTplsDir: 'email-templates' }).then(() => {
      this._template(tplName, locals, (err, html, text) => {
        if (err) {
          console.error(err);
          return d.reject(err);
        }

        self.send(from, to, subject, text, html).then((res) => d.resolve(res));
      });
    });

    return d.promise;
  },
};
