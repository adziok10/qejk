const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const expressValidator = require('express-validator');

const userController = require('./controllers/user.controller');
const memRouter = require('./routes/mem.routes');
// const config = require('./config/app.config');

import config from './config/app.config';

const app = express();

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(expressValidator());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if(req.method === 'OPTIONS') {
        res.header('Access-Controll-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});


mongoose.Promise = Promise;  
mongoose.connect(process.env.MONGODB_URI  || 'mongodb://mongo:27017/kwejk', (err) => {
    if (err) {
        console.log(err);
        console.log('---> Can`t connect to mongo db');
        process.exit(1);
    }
    else {
        console.log('---> Connect to mongo db');
    }
});

app.use('/user', userController);
app.use('/mem', memRouter);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});


app.listen(config.port, () => {
    console.log('hej port ' + config.port);
});
