const express = require('express');

const appRoute = express.Router();
const authController = require('../../Controllers/auth');
// const {}
const {
  about,
  home,
  faq,
  contactUs,
  signOutPopUp,
  comingSoon,
  verify,
} = require('../../Controllers/views');
const { logout } = require('../../Controllers/views/logout');
const { directory } = require('../../Controllers/views/directory');

appRoute.get('/', home);
appRoute.get('/about-us', about);
appRoute.get('/contact-us', contactUs);
appRoute.get('/directory', directory);
appRoute.get('/faq', faq);
appRoute.get('/signOutPopUp', signOutPopUp);
appRoute.get('/coming-soon', comingSoon);
appRoute.get('/verify-email', verify);
appRoute.get('/logout', logout);

appRoute.post('/loggedout', authController.postLogout);
module.exports = appRoute;
