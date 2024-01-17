const { Order } = require('../models/Order');

exports.createOrder = async (req, res) => {
  const { id } = req.user;
  const order = new Order({ ...req.body, user: id });
  try {
    const response = await order.save();
    // const ans = response.populate('product');
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchOrder = async (req, res) => {
  let query = Order.find({});
  let querydemo = Order.find({});

  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }
  if (req.query._page && req.query._limit) {
    const pagesize = req.query._limit;
    const page = req.query._page;

    query = query.skip(pagesize * (page - 1)).limit(pagesize);
  }
  let tot = await querydemo.count().exec();
  console.log(tot);
  try {
    res.set('X-Total-Count', tot);
    const response = await query.exec();
    res.status(200).json(response);
    // console.log(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchLoggedInUserOrders = async (req, res) => {
  let { id } = req.user;
  try {
    let qry = await Order.find({ user: id }).populate('user');
    console.log(qry);
    res.status(200).json(qry);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.updateOrder = async (req, res) => {
  let { id } = req.params;
  try {
    let qry = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    })
      .populate('user')
      .exec();
    res.status(200).json(qry);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.deleteCart = async (req, res) => {
  let { id } = req.params;
  try {
    let qry = await Cart.findByIdAndDelete(id).exec();
    res.status(200).json(qry);
  } catch (error) {
    res.status(400).json(error);
  }
};
