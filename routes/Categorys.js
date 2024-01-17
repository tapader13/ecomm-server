const express = require('express');
const { createCategory, fetchCategory } = require('../controllers/Category');
const router = express.Router();
router.post('/', createCategory);
router.get('/', fetchCategory);
exports.router = router;
