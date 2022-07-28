import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from '../models/user.model.js';
import MailService from '../services/mail.service.js';

import { JWT_SECRET, JWT_EXPIRES_IN } from '../config.js';

const createJWT = (user) => jwt.sign(
    { _id: user._id, email: user.email },
    JWT_SECRET,
    {
        expiresIn: JWT_EXPIRES_IN,
    },
);

const login = async (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'email')
        || !Object.prototype.hasOwnProperty.call(req.body, 'password')) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Email and password requried',
        });
    }

    try {
        const user = await UserModel.findOne({
            email: req.body.email,
        }).exec();

        const isPasswordValid = bcrypt.compareSync(
            req.body.password,
            user.password,
        );
        if (!isPasswordValid) return res.status(401).send({ token: null });

        const token = createJWT(user);

        return res.status(200).json({
            token,
            username: user.firstName,
        });
    }
    catch (err) {
        return res.status(401).json({
            error: 'Unauthorized',
            message: err.message,
        });
    }
};

const register = async (req, res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'email')
    || !Object.prototype.hasOwnProperty.call(req.body, 'password')) {
        return res.status(400).json({
            error: 'Bad Request',
            message: 'Email and password requried',
        });
    }

    try {
        const userInfo = {
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        };

        const user = await UserModel.create(userInfo);

        const token = createJWT(user);
        res.status(200).json({
            token,
        });
    }
    catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                error: 'User exists',
                message: err.message,
            });
        } 
        return res.status(500).json({
            message: err.message,
        });
    }
    MailService.sendRegisterConfirmationMail(req.body.email);
};

export default {
    login,
    register,
};
