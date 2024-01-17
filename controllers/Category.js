const { Categorie } = require('../models/Category');

exports.createCategory = async (req, res) => {
  const category = new Categorie(req.body);
  try {
    const response = await category.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchCategory = async (req, res) => {
  let query = Categorie.find({});
  try {
    const response = await query.exec();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
};
