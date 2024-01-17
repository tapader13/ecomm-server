const express = require('express');
const {
  createOrder,
  fetchLoggedInUserOrders,
  fetchOrder,
  updateOrder,
} = require('../controllers/Order');
const router = express.Router();
router.post('/', createOrder);
router.get('/:user', fetchLoggedInUserOrders);
router.get('/', fetchOrder);
router.patch('/:id', updateOrder);
// router.delete('/:id', deleteCart);

exports.router = router;
