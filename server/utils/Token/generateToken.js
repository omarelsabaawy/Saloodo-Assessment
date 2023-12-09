const jwt = require('jsonwebtoken');

exports.generateToken = (userId, username, userType) => {
    const secretKey = process.env.JWT_SECRET;
    const expiresIn = '1h';
    const token = jwt.sign({ userId, username, userType }, secretKey, { expiresIn });
    return token;
}