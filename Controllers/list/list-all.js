/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */
/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
const model = require('../../Models/index');
const { errorResMsg, successResMsg } = require('../../Utils/response');

const keysOfArray = (modelResult, arrayObj) => {
  modelResult.map((x) => {
    if (arrayObj.hasOwnProperty(x.dataValues.employee_id)) arrayObj[x.dataValues.employee_id].push(x.dataValues);
    else arrayObj[x.dataValues.employee_id] = [x.dataValues];
  });
  return arrayObj;
};

const listAllEmployers = async (req, res) => {
  try {
    const query = await model.Employer.findAll({});
    const employers = await query;
    const data = { data: employers };
    return successResMsg(res, 200, data);
  } catch (err) {
    return errorResMsg(res, 500, 'Opps!, something broke');
  }
};

// list all employees
const listAllEmployees = async (req, res) => {
  try {
    const employees = await model.Employee.findAll({});
    const skill = await model.Skill.findAll({});
    const portfolio = await model.Portfolio.findAll({});

    const hashMap = {};
    let skillHashMap = {};
    let portfolioHashMap = {};
    const results = [];

    skillHashMap = keysOfArray(skill, skillHashMap);

    portfolioHashMap = keysOfArray(portfolio, portfolioHashMap);

    employees.map((x) => {
      hashMap[x.dataValues.employee_id] = x.dataValues;
    });

    Object.keys(hashMap).forEach((key) => {
      if (!skillHashMap.hasOwnProperty(key) && !portfolioHashMap.hasOwnProperty(key)) {
        hashMap[key] = { ...hashMap[key], skills: [], portfolios: [] };
      } else if (skillHashMap.hasOwnProperty(key) && !portfolioHashMap.hasOwnProperty(key)) {
        hashMap[key] = { ...hashMap[key], skills: JSON.parse(JSON.stringify(skillHashMap[key])), portfolios: [] };
      } else if (!skillHashMap.hasOwnProperty(key) && portfolioHashMap.hasOwnProperty(key)) {
        hashMap[key] = { ...hashMap[key], skills: [], portfolios: JSON.parse(JSON.stringify(portfolioHashMap[key])) };
      } else if (skillHashMap.hasOwnProperty(key) && portfolioHashMap.hasOwnProperty(key)) {
        hashMap[key] = { ...hashMap[key], skills: JSON.parse(JSON.stringify(skillHashMap[key])), portfolios: JSON.parse(JSON.stringify(portfolioHashMap[key])) };
      }
      results.push(hashMap[key]);
    });

    const data = { all_employee_data: results };
    return successResMsg(res, 200, data);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return errorResMsg(res, 500, 'Opps!, something broke');
  }
};

module.exports = {
  listAllEmployers,
  listAllEmployees,
};
