/*
 * Created on Fri Sep 25 2020
 * Copyright (c) 2020 Mark Ambrocio
 * CC BY-NC-SA 4.0
 */

const bcrypt = require('bcryptjs');
const User = require('../models/user-model');

function validateUserLoginRequest() {
  return async (req, res, next) => {
    // check to see if the user exists
    const user = await User.findByEmail(req.body.email);
    if (!user) {
      return res.status(401).json({
        message: 'No user with this email',
      });
    }
    // set user before passing along
    req.user = user;
    console.log('User found, attempting to login');

    // checking password
    const vibeCheck = await bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!vibeCheck) {
      return res.status(401).json({
        message: 'Wrong email or password!',
      });
    }

    // all vibe check passed
    console.log('Password check passed, issuing token');
    delete req.user.password;
    next();
  };
}
module.exports = validateUserLoginRequest;
