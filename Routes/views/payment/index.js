const express = require('express');
const appRoute = express.Router();

const {
  packages,
  paymentSuccessModal,
  pricePayment,
  paymentSuccess,
} = require('../../../Controllers/views/payment/payment');

appRoute.get('/packages', packages);
appRoute.get('/payment-success-modal', paymentSuccessModal);
appRoute.get('/price-payment', pricePayment);
appRoute.get('/s', paymentSuccess);

module.exports = appRoute;
