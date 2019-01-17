const jwt = require('jsonwebtoken');
const config = require('../config/app.config');

module.exports = (req, res, next) => {
    try {
        const token =  req.headers.authorization.split(" ")[1];
        decoded = jwt.verify(token, config.jwt_secret);
        req.jwt_data = decoded;
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
    next();
};