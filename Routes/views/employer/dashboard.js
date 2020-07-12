const express = require('express');
const appRoute = express.Router();

const {
  employerDashboard,
  employerProfile,
  employerMessages,
  employerCreateProfile,
  employerType,
  employerIndividual,
  employerCompany,
  employerDashboardSettings,
  employerDashboardSupport,
  employerEmployeeGallery,
  employerAddTeam,
  employerCompanyDashboard,
  employerIndividualCreateProfile,
  employerCertificate,
} = require('../../../Controllers/views/employer/dashboard');

appRoute.get('/employer-dashboard', employerDashboard);
appRoute.get('/employer-profile', employerProfile);
appRoute.get('/employer-messages', employerMessages);
appRoute.get('/employer-create-profile', employerCreateProfile);
appRoute.get('/employer-type', employerType);
appRoute.get('/employer-company', employerCompany);
appRoute.get('/employer-individual', employerIndividual);
appRoute.get('/employer-dashboard-settings', employerDashboardSettings);
appRoute.get('/employer-dashboard-support', employerDashboardSupport);
appRoute.get('/employer-employees-gallery', employerEmployeeGallery);
appRoute.get('/employer-add-team', employerAddTeam);
appRoute.get('/employer-company-dashboard', employerCompanyDashboard);
appRoute.get(
  '/employer-individual-create-profile',
  employerIndividualCreateProfile,
);
appRoute.get('/employer-certificate', employerCertificate);

module.exports = appRoute;
