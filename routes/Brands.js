const express = require('express');
const { createBrand, fetchBrands } = require('../controllers/Brand');
const router = express.Router();
router.post('/', createBrand);
router.get('/', fetchBrands);
exports.router = router;
