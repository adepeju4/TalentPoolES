const router = require('express').Router();
const { authorize } = require('../../Middleware');
const Role = require('../../Middleware/role');

const { getAllEmployees } = require('../../Controllers/employer/get-employees');

router.get('/employees', authorize(Role.Employer), getAllEmployees);

module.exports = router;
