const { Cart } = require('../models/Cart');

exports.createCart = async (req, res) => {
  const { id } = req.user;
  const cart = new Cart({ ...req.body, user: id });
  try {
    const response = await cart.save();
    const ans = response.populate('product');
    res.status(201).json(ans);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchProductByFilter = async (req, res) => {
  let query = Product.find({});
  let querydemo = Product.find({});

  if (req.query.category) {
    query = query.find({ category: req.query.category });
    querydemo = querydemo.find({ category: req.query.category });
  }
  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    querydemo = querydemo.find({ brand: req.query.brand });
  }
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

exports.fetchCartById = async (req, res) => {
  let { id } = req.user;
  try {
    let qry = await Cart.find({ user: id })
      .populate('user')
      .populate('product');
    console.log(qry);
    res.status(200).json(qry);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.updateCart = async (req, res) => {
  let { id } = req.params;
  try {
    let qry = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    })
      .populate('product')
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
