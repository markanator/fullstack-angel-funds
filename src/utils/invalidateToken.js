const jwt = require("jsonwebtoken");

exports.invalidateToken = () => {
    const token = jwt.sign(
        { userID: null, userRole: null, isLoggedIn: false },
        process.env.JWT_SECRET
    );

    return token;
};
