const express = require('express');
const {
  createUser,
  checkUser,
  chkuser,
  loginUser,
} = require('../controllers/Auth');
const passport = require('passport');
const router = express.Router();
router.post('/signup', createUser);
router.post('/login', passport.authenticate('local'), loginUser);
router.get('/check', passport.authenticate('jwt'), chkuser);
exports.router = router;
