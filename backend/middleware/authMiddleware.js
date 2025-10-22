import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import config from "../config.js";

export const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, config.jwtSecret);

            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Не авторизован' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Нет токена' });
    }
}
