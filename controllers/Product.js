const { Product } = require('../models/Product');

exports.createProduct = async (req, res) => {
  const product = new Product(req.body);
  //   console.log(response);
  try {
    const response = await product.save();
    res.status(201).json(response);
    // console.log(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchProductByFilter = async (req, res) => {
  let cond = {};
  if (!req.query.admin) {
    cond = { deleted: { $ne: true } };
  }
  let query = Product.find(cond);
  let querydemo = Product.find(cond);

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

exports.fetchProductById = async (req, res) => {
  let { id } = req.params;
  try {
    let qry = await Product.findById(id).exec();
    res.status(200).json(qry);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updateProduct = async (req, res) => {
  let { id } = req.params;
  try {
    let qry = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    }).exec();
    res.status(200).json(qry);
  } catch (error) {
    res.status(400).json(error);
  }
};
