const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const server = express();
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const path = require('path');
const {
  isAuth,
  sanitaizer,
  SECRET_KEY,
  cookieExtractor,
} = require('./services/Common');
var opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_KEY;
//midlwars
server.use(express.static(path.resolve(__dirname, 'build')));
server.use(express.static('public'));
server.use(
  session({
    secret: process.env.secret,
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);
server.use(cookieParser());
server.use(passport.authenticate('session'));

const productApi = require('./routes/Products');
const brandApi = require('./routes/Brands');
const categoryApi = require('./routes/Categorys');
const authApi = require('./routes/Auths');
const userApi = require('./routes/Users');
const cartApi = require('./routes/Carts');
const orderApi = require('./routes/Order');
const { User } = require('./models/User');

const PORT = 8080;
server.use(cors({ exposedHeaders: ['X-Total-Count'] }));
server.use(express.json());
server.use('/products', isAuth(), productApi.router);
server.use('/brands', isAuth(), brandApi.router);
server.use('/categories', isAuth(), categoryApi.router);
server.use('/auth', authApi.router);
server.use('/users', isAuth(), userApi.router);
server.use('/carts', isAuth(), cartApi.router);
server.use('/orders', isAuth(), orderApi.router);

passport.use(
  'local',
  new LocalStrategy({ usernameField: 'email' }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await User.findOne({ email: email }).exec();
      if (!user) {
        done(null, false, { message: 'no user found' });
      } else {
        crypto.pbkdf2(
          password,
          user.salt,
          310000,
          32,
          'sha256',
          async function (err, hashedPassword) {
            if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
              done(null, false, { message: 'no pass found' });
            } else {
              let token = jwt.sign(sanitaizer(user), SECRET_KEY);
              done(null, { id: user.id, role: user.role, token });
            }
          }
        );
      }
    } catch (error) {
      done(error);
    }
  })
);
passport.use(
  'jwt',
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log(jwt_payload, 'jwtpa');
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, sanitaizer(user));
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(err, false);
    }
  })
);
passport.serializeUser(function (user, cb) {
  console.log(user, 'ser');
  process.nextTick(function () {
    return cb(null, sanitaizer(user));
  });
});

passport.deserializeUser(function (user, cb) {
  console.log(user, 'des');

  process.nextTick(function () {
    return cb(null, user);
  });
});

//payment stripe setup

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.mongoUrl);
  console.log('connect mongo');
}

server.get('/', (req, res) => {
  res.json({ status: 'success' });
});

server.listen(PORT, () => console.log(`server start at ${PORT}`));
