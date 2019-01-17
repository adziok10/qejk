const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.post('/register', (req, res) => {
    const user = new User({
        login: req.body.login,
        email: req.body.email,
        password: req.body.password,
        createAt: Date.now()
    });


    user.save().then((data) => {
        res.status(201).json(data);
    }).catch((err) => {
        res.status(501).json(err);
    });
});

router.post('/login', (req, res) => {
    user = User.login(req);
    user.then((data) => {
        res.json(data);
    })
    .catch(err => {
        res.json({
            'message': 'Error'
        });
    })
});

router.get('/', (req, res) => {
    User.getUserList().then((data) => {
        console.log(data);
        res.json({
            'test': data
        });
    });
});

module.exports = router;