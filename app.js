/* eslint-disable comma-dangle */
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const dotenv = require('dotenv');
const passport = require('passport');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');

// Requiring express rate limit
// const rateLimit = require('express-rate-limit');
const fileupload = require('express-fileupload');
const cors = require('cors');
// eslint-disable-next-line no-unused-vars
const { errorResMsg } = require('./Utils/response');

dotenv.config();
// eslint-disable-next-line import/order
const morgan = require('morgan');
const db = require('./Models');
const { seedSuperAdmin } = require('./seed');
const googleAuth = require('./routes/googleAuth'); // require google auth route to test endpoint

require('./config/passport.setup');
const errorHandler = require('./Utils/error-handler');

// IMPORT EMPLOYEE PROFILE ROUTER
const employeeProfileRouter = require('./routes/employee/employee-profile');
// IMPORT EMPLOYEE HELP ROUTE
const employeeHelpRoute = require('./routes/employee/employee-help');
// IMPORT EMPLOYEE PORTFOLIO ROUTE
const employeePortfolioRoute = require('./routes/employee/employee-portfolio');
// IMPORT EMPLOYEE SKILLS ROUTE
const employeeSkillsRoutes = require('./routes/employee/employee-skills');
// IMPORT EMPLOYEE SEARCH ROUTE
const employeeSearchRoutes = require('./routes/employee/employee-search');
const auth = require('./routes/auth');
// employer route
const employerRoute = require('./routes/employerRoute/employer-route');
// IMPORT EMPLOYEE SEARCH ROUTE
const employerUpgradeRoute = require('./routes/employer/employer-upgrade');
// IMPORT TEAM ROUTES
const teamRoutes = require('./routes/team');
// IMPORT ADMIN MANAGEMENT ROUTE
const adminManagementRoute = require('./routes/super-admin/manage-admin');
// import route for company
const companyRouter = require('./routes/company/company');
// IMPORT FAQ ROUTES
const faqRoutes = require('./routes/faq');
const faqGeneralRoutes = require('./routes/faq-all');
const chatRoute = require('./routes/chat');

const packageRoutes = require('./routes/employer/employer-package');

// IMPORT ADMIN OPERATION ROUTE
const adminHelpRoute = require('./routes/admin/admin-help');

// IMPORT ADMIN ROUTES
// const adminRoute = require('./routes/admin');
const adminBaseFunction = require('./routes/admin/users');
// const adminViewAllEmployees = require('./routes/admin/ViewAllEmployees');

// IMPORT REVIEWS
const employerReviews = require('./routes/employee/employee-review');

// IMPORT ADMIN EXPORT DATA AS CSV OPERATION
const adminExportEmployer = require('./routes/admin/export-employer');
const adminExportEmployee = require('./routes/admin/export-verified-employee');
const adminVerifyEmployer = require('./routes/admin/verify-employer');
const adminVerifyEmployee = require('./routes/admin/verify-employee');

// IMPORT ALL GET EMPLOYERS AND EMPLOYEES ROUTE --ADMIN
const listAll = require('./routes/list/list-all');

// IMPORT TRANSACTION ROUTES
const employerTransaction = require('./routes/employer/employer-transaction');

// IMPORT GET VERFIED EMPLOYEES ROUTES
const getAllEmployees = require('./routes/employer/get-employees');

// IMPORT THE VIEWS ROUTES
const appRoute = require('./routes/views');
const adminDashRoute = require('./routes/views/admin/dashboard');
const employeeAuthRoute = require('./routes/views/employee/auth');
const employeeDashboardRoute = require('./routes/views/employee/dashboard');
const employerAuthRoute = require('./routes/views/employer/auth');
const employerDashboardRoute = require('./routes/views/employer/dashboard');
const topTalentsRoute = require('./routes/views/employee/topTalents');
const testimonialsRoute = require('./routes/views/employer/testimonials');
const directoryRoute = require('./routes/views');
const passwordRoute = require('./routes/views/password/index');
const paymentRoute = require('./routes/views/payment/index');
const adminAuthRoute = require('./routes/views/admin/auth');
const employerMetrics = require('./routes/views/employer/metrics');
const employerRecommendation = require('./routes/views/employer/recommendation');
const verifyModal = require('./routes/views/admin/verifyModal');
// IMPORT SUPPORT ROUTE
const supportRoute = require('./routes/support');


const app = express();

app.use(morgan('tiny'));
app.use(cors());

// Set Security HTTP Headers
app.use(helmet());

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// using rateLimit
// const limiter = rateLimit({
//   // set the max depending on your application
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many request from this IP, please try again in an hour!',
// });

// applying the limiter on only the route that starts with /api
// app.use('/v1', limiter);

// This should be the last route else any after it won't work
// app.use('*', (req, res) => {
//   errorResMsg(res, 404, { message: 'Resource not found' });
// });

app.use(fileupload({ useTempFiles: true }));
db.sequelize.sync().then(() => {
  seedSuperAdmin();
});

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    name: 'session',
    keys: [process.env.TALENT_POOL_SESSION_COOKIEKEY],
  }),
);

// passportjs initialization
app.use(passport.initialize());
app.use(passport.session());

// express body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Cookie Parser
app.use(cookieParser());
// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES

// chat route
app.use('/v1/message', chatRoute);

// Company Route Endpoint
app.use('/v1/company', companyRouter);

// employees route
app.use('/v1/employee', employeeProfileRouter);
app.use('/v1/employee', employeePortfolioRoute);
app.use('/v1/employee', employeeHelpRoute);
app.use('/v1/employee', employeeSkillsRoutes);
app.use('/v1/employee', employeeSearchRoutes);

// employers route goes here
app.use('/v1/employer', employerRoute);
app.use('/v1/employer', employerUpgradeRoute);
app.use('/v1/employer', employerReviews);
app.use('/v1/employer', employerTransaction);

// Employers get all verified employees
app.use('/v1/employer', getAllEmployees);

// admin routes goes here
app.use('/v1/admin', adminHelpRoute);
app.use('/v1/admin', faqRoutes);
app.use('/v1/admin', adminBaseFunction);

// get general FAQ routes
app.use('/v1', faqGeneralRoutes);

// app.use('/v1/admin', adminViewAllEmployees);
app.use('/v1/admin', adminExportEmployer);
app.use('/v1/admin', adminExportEmployee);
app.use('/v1/admin', adminVerifyEmployer);
app.use('/v1/admin', adminVerifyEmployee);
app.use('/v1', listAll); // Get ALL Employees and Employers

// team route goes here
app.use('/v1/team', teamRoutes);

// auth
app.use('/v1/auth', googleAuth);
app.use('/v1/auth', auth);

// app.use('/v1/admin', adminRoute); // admin
app.use('/v1/admin', adminManagementRoute); // super admin

// packages
app.use('/v1/package', packageRoutes);
// user support
app.use('/users', supportRoute);
// global error handler
app.use(errorHandler);

// All routes
app.use(appRoute);
// app.use(adminRoute);
app.use(employeeAuthRoute);
app.use(employeeDashboardRoute);
app.use(employerAuthRoute);
app.use(employerDashboardRoute);
app.use(adminDashRoute);
app.use(topTalentsRoute);
app.use(testimonialsRoute);
app.use(directoryRoute);
app.use(passwordRoute);
app.use(paymentRoute);
app.use(adminAuthRoute);
app.use(employerMetrics);
app.use(employerRecommendation);
app.use(verifyModal);

module.exports = app;
