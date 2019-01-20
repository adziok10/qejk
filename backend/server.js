'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

require('dotenv/config');

var _index = require('./src/routers/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = process.env.PORT || 3000;
app.use((0, _morgan2.default)('dev'));
app.use('/uploads', _express2.default.static('uploads'));
app.use(_bodyParser2.default.urlencoded());
app.use(_bodyParser2.default.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Controll-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE');
        return res.status(200).send();
    }
    next();
});

_mongoose2.default.Promise = Promise;
_mongoose2.default.connect(process.env.MONGODB_URI || 'mongodb://mongo:27017/kwejk', function (err) {
    if (err) {
        console.log('---> Can`t connect to mongo db');
        process.exit(1);
    } else {
        console.log('---> Connect to mongo db');
    }
});

app.use(_index2.default);

app.use(function (req, res, next) {
    var error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use(function (error, req, res, next) {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});

app.listen(port, function () {
    console.log('Start on port: ' + port);
});
