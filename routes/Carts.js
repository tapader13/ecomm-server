const express = require('express');
const {
  createCart,
  fetchCartById,
  updateCart,
  deleteCart,
} = require('../controllers/Cart');

const router = express.Router();
router.post('/', createCart);
router.get('/', fetchCartById);
router.patch('/:id', updateCart);
router.delete('/:id', deleteCart);

exports.router = router;
