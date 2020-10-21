/*
 * Created on Fri Sep 25 2020
 * Copyright (c) 2020 Mark Ambrocio
 * CC BY-NC-SA 4.0
 */

const jwt = require('jsonwebtoken');

const createToken = async (user) => {
  const token = jwt.sign(
    { userID: user.id, userRole: user.userRole, isLoggedIn: true },
    process.env.JWT_SECRET
  );
  return token;
};
module.exports = createToken;
