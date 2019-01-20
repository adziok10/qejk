import express from 'express';
import joiValidator from 'express-joi-validation';
import asyncMiddleware from '../helpers/async-middleware.helper';
import UserController from '../controllers/user.controller';
import { registerValidator } from '../validators/user.validator';


const router = express.Router();

const validate = joiValidator({passError: true});

router.post('/register', validate.body(registerValidator), asyncMiddleware(UserController.register));

router.post('/login', asyncMiddleware(UserController.login));

module.exports = router;
