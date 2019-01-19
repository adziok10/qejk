const { image_destination } = require('../config/app.config');
const multer = require('multer');
const mime = require('mime');

module.exports = {
    getStorage() {
        switch (image_destination) {
            case 'imgur':
                return multer.memoryStorage();
                //break
            case 'node':
                console.log('a')
                return multer.diskStorage({
                    destination: function(req, file, cb) {
                        cb(null, './uploads')
                    },
                    filename: function(req, file, cb) {
                        cb(null, file.fieldname + '-' + Date.now() + '.' + mime.getExtension(file.mimetype))
                    }
                });
                //break
            default:
                console.log('Select image destination');
                console.log('App closed');
                process.exit(1);
                break;
        }
    },
    fileFilter(req, file, cb) {

        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif')
            cb(null, true);
        else
            cb(new Error('Not allowed file type'));
    
    }
};