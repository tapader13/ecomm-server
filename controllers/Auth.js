const { User } = require('../models/User');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { sanitaizer, SECRET_KEY } = require('../services/Common');

exports.createUser = async (req, res) => {
  try {
    var salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      'sha256',
      async function (err, hashedPassword) {
        console.log(req.body, 'signup');
        const user = new User({ ...req.body, password: hashedPassword, salt });
        const response = await user.save();
        req.login(sanitaizer(response), (err) => {
          if (err) {
            res.status(400).json(err);
          } else {
            let token = jwt.sign(sanitaizer(response), SECRET_KEY);
            res
              .cookie('jwt', token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true,
              })
              .status(201)
              .json({ id: response.id, role: response.role });
          }
        });
      }
    );
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.loginUser = async (req, res) => {
  const user = req.user;
  res
    .cookie('jwt', user.token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    })
    .status(201)
    .json({ id: user.id, role: user.role });
};
exports.chkuser = async (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.sendStatus(401);
  }
};
