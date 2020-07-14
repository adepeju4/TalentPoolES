const db = require('../../Models/index');
const mailer = require('../../Utils/mailer');

exports.createSupport = async (req, res) => {
  try {
    await db.Support.create(req.body);
    await mailer.send({
      template: '../emails/support',
      message: {
        to: req.body.email,
      },
      locals: {
        name: req.body.name,
        type: req.body.type,
      },
    });
    res.status(200).json('sent');
  } catch (error) {
    req.flash('error', 'An error occured, please try again');
    res.status(500).json('error');
  }
};

exports.notificationSettings = async (req, res) => {
  const {
    login_notif,
    profile_notif,
    verification_notif,
    newsletter_notif,
  } = req.body;
  try {
    await db.User.update(
      { login_notif, profile_notif, verification_notif, newsletter_notif },
      { where: { user_id: req.body.user_id } },
    ); // FIXME: change to use req.session later
    res.status(200).json('done');
  } catch (error) {
    req.flash('error', 'An error occured, please try again');
    res.status(500).json('error');
  }
};
