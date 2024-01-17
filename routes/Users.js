const express = require('express');
const { updateUser, fetchLoginUserInfo } = require('../controllers/User');
const router = express.Router();
router.patch('/:id', updateUser);
router.get('/own', fetchLoginUserInfo);
exports.router = router;
