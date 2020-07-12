const express = require('express');
const { authorize } = require('../../Middleware/index');
const Role = require('../../Middleware/role');

const { Create, GetAll, Delete } = require('../../Controllers/employer/employer-transaction');

const router = express.Router();
router.post('/create', authorize([Role.Admin, Role.SuperAdmin]), Create);
router.get('/:employer_id', authorize([Role.Admin, Role.SuperAdmin]), GetAll);
router.delete('/:id/:employer_id', authorize([Role.Admin, Role.SuperAdmin]), Delete);

module.exports = router;
