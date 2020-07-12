/* eslint-disable comma-dangle */
const express = require('express');
const { authorize } = require('../../Middleware/index');
const Role = require('../../Middleware/role');

// Portfolio
const {
  portfolioCreate,
  portfolioUpdate,
  portfolioDelete,
  portfolioGet,
  portfolioList,
} = require('../../Controllers/employee/employee-portfolio');
const {
  PortfolioValidation,
} = require('../../Utils/validators/employee-portfolio');

const router = express.Router();

router.post(
  '/portfolio',
  authorize(Role.Employee),
  PortfolioValidation.validatePortfolio,
  portfolioCreate
);
router.get(
  '/portfolio/:employee_id/:id',
  authorize(Role.Employee),
  portfolioGet
);
router.put(
  '/portfolio/:employee_id/:id',
  authorize(Role.Employee),
  PortfolioValidation.updatePortfolio,
  portfolioUpdate
);

router.delete(
  '/portfolio/:employee_id/:id',
  authorize(Role.Employee),
  portfolioDelete
); // Implemented for issue 103 - Delete Employee Portfolio #103
router.get('/portfolios/:employee_id', authorize(Role.Employee), portfolioList);

module.exports = router;
