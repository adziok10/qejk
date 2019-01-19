const express = require('express');
const router = express.Router();
const multer = require('multer');
const mime = require('mime');

const Mem = require('../models/mem.model');
const checkAuth = require('../helpers/check-auth.helper');
const { getStorage, fileFilter, imgurSave } = require('../helpers/image-dest.helper');


const upload = multer({
    storage: getStorage(),
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.post('/', checkAuth, upload.single('mem'), imgurSave, (req, res) => {
    const mem = new Mem({
        title: req.body.title,
        description: req.body.description,
        owner: req.jwt_data.name,
        ownerId: req.jwt_data.id,
        createAt: Date.now(),
        link: req.file.path
    });

    mem.save().then((data) => {
        return res.status(201).json(data._id);
    }).catch((err) => {
        return res.status(501).json(err);
    });
    
});

router.get('/:id', (req, res) => {
    Mem.findOne({
            _id: req.params.id
        })
        .select('name _id description title owner link createAt')
        .then((mem) => {
            if (!mem) {
                return res.status(404).json({
                    message: 'Not found'
                });
            }

            return res.status(200).json(mem);
        });
});

router.get('/', (req, res) => {
    let memesToSkip;
    if (req.param('page')){
        memesToSkip = 10 * req.param('page');
    } else {
        memesToSkip = 0;
    }
    Mem.find({}).select('name _id description title owner link createAt').sort({ createAt: 'desc' }).limit(10).skip(memesToSkip).then( mem => {
        if (mem.length == 0)
            return res.status(404).json({
                message: 'No memes here'
            });

        return res.status(200).json(mem);
    });
});

module.exports = router;