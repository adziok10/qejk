import express from 'express';

import userRouter from './user.router';
import memRouter from './mem.router';

const router = express.Router();

router.use('/user', userRouter);

router.use('/mem', memRouter);

export default router;