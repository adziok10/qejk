const express = require('express');
const router = express.Router();
const multer = require('multer');
const mime = require('mime');

const Mem = require('../models/mem.model');
const checkAuth = require('../helpers/check-auth.helper');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + mime.getExtension(file.mimetype))
    }
});

function fileFilter(req, file, cb) {

    console.log(file.mimetype)
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif')
        cb(null, true);
    else
        cb(new Error('Not allowed file type'));

}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.post('/', checkAuth,(req, res, next) => { console.log(req.body); next()}, upload.single('mem'), (req, res) => {
    
    const mem = new Mem({
        title: req.body.title,
        description: req.body.description,
        owner: req.jwt_data.name,
        ownerId: req.jwt_data.id,
        createAt: Date.now(),
        link: req.file.path
    });

    console.log('a tu jestem?')
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
    Mem.find({}).select('name _id description title owner link createAt').sort({ createAt: 'desc' }).then(mem => {
        if (mem.length == 0)
            return res.status(404).json({
                message: 'No memes here'
            });

        return res.status(200).json(mem);
    });
});

module.exports = router;