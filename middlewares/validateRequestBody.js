/*
 * Created on Fri Sep 25 2020
 * Copyright (c) 2020 Mark Ambrocio
 * CC BY-NC-SA 4.0
 */

function validateRequestBody(mandatory) {
  return async (req, res, next) => {
    try {
      for (requiredField of mandatory) {
        if (!req.body[requiredField]) {
          return res.status(400).json({
            error: `${requiredField} is a required field`,
          });
        }
      }
      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = validateRequestBody;
