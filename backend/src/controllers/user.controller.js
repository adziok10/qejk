const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');

const router = express.Router();
const User = require('../models/user.model');
const config = require('../config/app.config');
const checkAuth = require('../helpers/check-auth.helper');


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














router.post('/register', [
    body('login')
    .isLength({
        min: 5,
        max: 20
    }),
    sanitize('login').trim(),
    body('email')
    .isEmail()
    .normalizeEmail(),
    body('password')
    .isLength({
        min: 5,
        max: 20
    }),
    sanitize('password').trim()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

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
});


router.get('/', checkAuth, (req, res) => {
    User.find({}).then(data => {
        res.json({
            'test': data,
            'tes2': req.jwt_data,
        });
    });
});