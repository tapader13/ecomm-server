const { User } = require('../models/User');

exports.updateUser = async (req, res) => {
  let { id } = req.params;
  try {
    let qry = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    }).exec();
    res.status(200).json(qry);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.fetchLoginUserInfo = async (req, res) => {
  let { id } = req.user;
  try {
    let qry = await User.findById(id).exec();
    delete qry.password;
    delete qry.salt;
    res.status(200).json(qry);
  } catch (error) {
    res.status(400).json(error);
  }
};
