const { image_destination, imgur_ID } = require('../config/app.config');
const multer = require('multer');
const mime = require('mime');
const imgurUploader = require('imgur-uploader');

module.exports = {
    getStorage () {
        console.log(image_destination)
        switch (image_destination) {
            case 'node':
                console.log('tu>') 
                return multer.diskStorage({
                    destination: function(req, file, cb) {
                        cb(null, './../uploads')
                    },
                    filename: function(req, file, cb) {
                        cb(null, file.fieldname + '-' + Date.now() + '.' + mime.getExtension(file.mimetype))
                    }
                });
            break;
            case 'imgur':
                return multer.memoryStorage();
            break;
            default:
                console.log('Select image destination');
                console.log('App closed');
                process.exit(1);
                break;
        }
    },
    fileFilter(req, file, cb) {

        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
            cb(null, true);
        } else {
            cb(new Error('Not allowed file type'));
        }
    },
    imgurSave(req, res, next)  {
        if(image_destination === 'imgur'){
            imgurUploader(req.file.buffer, { title: req.body.title }, imgur_ID).then((data) => {
                req.file.path = data.link;
                next();
            })
            .catch((err) => {
                return res.status(500).json(err);
            });
        }
        next();
    }
};