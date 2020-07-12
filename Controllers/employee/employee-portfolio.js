/* eslint-disable comma-dangle */
// const sequelize = require('sequelize')
const model = require('../../Models/index');
const { validateRequest } = require('../../Utils/request-body-validator');
const { errorResMsg, successResMsg } = require('../../Utils/response');

const portfolioCreate = (req, res) => {
  validateRequest(req, res);
  model.Portfolio.create({
    title: req.body.title,
    description: req.body.description,
    link: req.body.link,
    employee_id: req.body.employee_id,
  })
    .then((portfolio) => {
      const data = {
        message: 'portfolio created successfully',
        portfolio_id: portfolio.id,
        employee_id: portfolio.employee_id,
      };
      successResMsg(res, 201, data);
    })
    .catch(() => {
      errorResMsg(res, 500, 'cannot create portfolio');
    });
};

const portfolioGet = (req, res) => {
  model.Portfolio.findOne({
    where: {
      id: req.params.id,
      employee_id: req.params.employee_id,
    },
  })
    .then((portfolio) => {
      if (portfolio == null) {
        return errorResMsg(res, 404, 'Portfolio not found with given id');
      }
      const dataResponse = {
        message: `portfolio id: ${portfolio.id}`,
        portfolio,
      };
      return successResMsg(res, 200, dataResponse);
    })
    .catch(() => errorResMsg(res, 500, 'cannot fetch portfolio'));
};

const portfolioUpdate = (req, res) => {
  validateRequest(req, res);
  model.Portfolio.update(
    {
      id: req.params.id,
      updated_at: Date.now(),
      title: req.body.title,
      description: req.body.description,
      link: req.body.link,
      employee_id: req.params.employee_id,
    },
    { where: { id: req.params.id, employee_id: req.params.id } },
  )
    .then(() => {
      const dataResponse = { message: 'Portfolio updated' };
      return successResMsg(res, 200, dataResponse);
    })
    .catch(() => errorResMsg(res, 404, 'Portfolio not found'))
    .catch(() => errorResMsg(res, 500, 'cannot fetch portfolio'));
};

const portfolioDelete = (req, res) => {
  model.Portfolio.destroy({
    where: {
      id: req.params.id,
      employee_id: req.params.employee_id,
    },
    force: true,
  })
    .then(() => {
      const dataResponse = { message: 'Portfolio deleted' };
      return successResMsg(res, 200, dataResponse);
    })
    .catch(() => errorResMsg(res, 404, 'Portfolio not found'))
    .catch(() => errorResMsg(res, 500, 'cannot fetch portfolio'));
};

const portfolioList = (req, res) => {
  const { employee_id: employeeId } = req.params;
  model.Portfolio.sync();
  model.Portfolio.findAll({
    where: {
      employee_id: employeeId,
    },
  })
    .then((portfolios) => {
      const dataResponse = {
        message: `All portfolios by user employee id: ${employeeId}`,
        portfolios,
      };
      return successResMsg(res, 200, dataResponse);
    })
    .catch(() => errorResMsg(res, 404, 'Portfolio not found'))
    .catch(() => errorResMsg(res, 500, 'cannot fetch portfolio'));
};

module.exports = {
  portfolioCreate,
  portfolioGet,
  portfolioUpdate,
  portfolioDelete,
  portfolioList,
};
