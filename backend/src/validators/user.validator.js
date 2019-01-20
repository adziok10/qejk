import joi from 'joi';

export const registerValidator = joi.object().keys({
    login: joi.string().min(5).max(255).required().alphanum().error( new Error('Login is not valid') ),
    password: joi.string().min(5).max(255).required().trim().error( new Error('Password is not valid') ),
    email: joi.string().email().required().error( new Error('Email is not valid') )
});