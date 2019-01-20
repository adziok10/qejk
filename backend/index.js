import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import expressValidator from 'express-validator';

import router from './src/routers/index';
import config from './src/config/app.config';

const app = express();

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

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

app.use(router);

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
    console.log('Start on port: ' + config.port);
});
