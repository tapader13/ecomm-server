const express = require('express');
const {
  createProduct,
  fetchProductByFilter,
  fetchProductById,
  updateProduct,
} = require('../controllers/Product');
const router = express.Router();
router.post('/', createProduct);
router.get('/', fetchProductByFilter);
router.get('/:id', fetchProductById);
router.patch('/:id', updateProduct);

exports.router = router;
