/*
 * Created on Fri Sep 25 2020
 * Copyright (c) 2020 Mark Ambrocio
 * CC BY-NC-SA 4.0
 */

const jwt = require('jsonwebtoken');
const Proj = require('../models/project_model');

function valUserCanEdit() {
  return async (req, res, next) => {
    const authError = {
      message:
        'EDIT MIDDLEWARE, these are not the projects you are looking for!',
    };

    try {
      const token = req.headers.authorization;
      // console.log(token);
      if (!token) {
        return res.status(401).json(authError);
      }
      const curProj = await Proj.findById(req.params.projectID);

      if (!curProj) {
        return res
          .status(404)
          .json({ message: 'Project not found, try again later.' });
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json(authError);
        }
        // console.log(req.body);
        // console.log(curProj.userID);
        if (decoded.userID !== curProj.userID) {
          return res.status(403).json(authError);
        }
        console.log('User is editing their respective project, move along.');
        next();
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = valUserCanEdit;
