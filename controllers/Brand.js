const { Brand } = require('../models/Brand');

exports.createBrand = async (req, res) => {
  const brand = new Brand(req.body);
  try {
    const response = await brand.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchBrands = async (req, res) => {
  let query = Brand.find({});
  try {
    const response = await query.exec();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};
