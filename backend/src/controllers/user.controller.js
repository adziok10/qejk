import express from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/user.model';
import config from '../config/app.config';


export default class UserController {

    static async register(req, res) {

        const user = new User({
            login: req.body.login,
            email: req.body.email,
            password: req.body.password,
            createAt: Date.now()
        });

        user.save().then((data) => {
            return res.status(201).json(data);
        }).catch((err) => {
            return res.status(501).json(err);
        });
    }

    static async login(req, res) {
        try {
            const user = await User.findOne({ login: req.body.login });

            if (!user) {

                return res.status(401).json({
                    'message': 'Bad login or password'
                })

            } else if (user) {

                if (!user.isValidPassword(req.body.password)) {

                    return res.status(401).json({
                        'message': 'Bad login or password'
                    })

                } else {

                    const payload = {
                        id: user._id,
                        name: user.login
                    };
                    const token = jwt.sign(payload, config.jwt_secret, {
                        expiresIn: config.jwt_expires_in
                    });

                    return res.status(200).json({
                        'status': 'success',
                        'token': token,
                        'expiresIn': config.jwt_expires_in
                    });

                }
            }
        } catch (err) {
            return res.status(501).json({ 'message': 'Server error' });
        }

    }
}
