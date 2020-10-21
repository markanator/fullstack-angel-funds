/*
 * Created on Fri Sep 25 2020
 * Copyright (c) 2020 Mark Ambrocio
 * CC BY-NC-SA 4.0
 */

const jwt = require('jsonwebtoken');

exports.invalidateToken = () => {
  const token = jwt.sign(
    { userID: null, userRole: null, isLoggedIn: false },
    process.env.JWT_SECRET
  );

  return token;
};
