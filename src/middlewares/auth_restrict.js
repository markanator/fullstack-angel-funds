const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

function restrict() {
    return async (req, res, next) => {
        const authError = {
            message:
                "AUTH MIDDLEWARE, these are not the routes you are looking for!",
        };

        try {
            const token = req.headers.authorization;
            // console.log(token);
            if (!token) {
                return res.status(401).json(authError);
            }

            jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
                if (err) {
                    return res.status(401).json(authError);
                }
                const { userID, userRole, isLoggedIn } = decoded;
                if (!userID || !userRole || !isLoggedIn) {
                    return res.status(403).json(authError);
                }

                const user = await User.findById(decoded.userID);
                if (!user) {
                    return res.status(404).json({
                        message: "AUTH, no user found.",
                    });
                }
                req.user = user;
                req.token = decoded;
                next();
            });
        } catch (err) {
            next(err);
        }
    };
}

module.exports = restrict;
