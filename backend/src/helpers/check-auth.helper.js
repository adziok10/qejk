import jwt from 'jsonwebtoken';
import config from '../config/app.config';

module.exports = (req, res, next) => {
    try {
        const token =  req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, config.jwt_secret);
        req.jwt_data = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};