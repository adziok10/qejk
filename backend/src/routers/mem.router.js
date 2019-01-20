import express from 'express';
import multer from 'multer';
import asyncMiddleware from '../helpers/async-middleware.helper';
import MemController from '../controllers/mem.controller';
import checkAuth from '../helpers/check-auth.helper';
import { getStorage, fileFilter, imgurSave } from '../helpers/image-dest.helper';

const router = express.Router();

const upload = multer({
    storage: getStorage(),
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.post('/', checkAuth, upload.single('mem'), imgurSave, asyncMiddleware(MemController.saveMem));

router.get('/:id', asyncMiddleware(MemController.getMem));

router.get('/', asyncMiddleware(MemController.getAllMemes));

module.exports = router;
