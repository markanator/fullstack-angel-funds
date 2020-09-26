/*
 * Created on Fri Sep 25 2020
 * Copyright (c) 2020 Mark Ambrocio
 * CC BY-NC-SA 4.0
 */

const User = require('../models/user-model');

async function validateUserEditRequirements(req, res, next) {
  try {
    if (req.body.username) {
      const user = await User.findByUsername(req.body.username);
      if (user && user.id !== req.params.id)
        return res
          .status(400)
          .json({ error: 'User with that username already exist' });
    }
    if (req.body.email) {
      const email = await User.findByEmail(req.body.email);
      if (email && email.id !== req.params.id)
        return res
          .status(400)
          .json({ error: 'User with that email already exist' });
    }
    next();
  } catch (err) {
    next(err);
  }
}
module.exports = validateUserEditRequirements;
