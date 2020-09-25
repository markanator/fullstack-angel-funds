const jwt = require("jsonwebtoken");

const createToken = async (user) => {
    const token = jwt.sign(
        { userID: user.id, userRole: user.userRole, isLoggedIn: true },
        process.env.JWT_SECRET
    );
    return token;
};
module.exports = createToken;
