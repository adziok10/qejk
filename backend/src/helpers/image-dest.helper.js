import multer from 'multer';
import mime from 'mime';
import imgurUploader from 'imgur-uploader';

export const getStorage = () => {

    let response;

    switch (process.env.image_destination) {
        case 'node':
            response = multer.diskStorage({
                destination: function(req, file, cb) {
                    cb(null, './../uploads')
                },
                filename: function(req, file, cb) {
                    cb(null, file.fieldname + '-' + Date.now() + '.' + mime.getExtension(file.mimetype));
                }
            });
            break;
        case 'imgur':
            response = multer.memoryStorage();
            break;
        default:
            console.log('Select image destination');
            console.log('App closed');
            process.exit(1);
            break;
    }

    return response;
};

export const fileFilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
        cb(null, true);
    } else {
        cb(new Error('Not allowed file type'));
    }

};

export const imgurSave = async (req, res, next) => {

    if (process.env.image_destination === 'imgur') {
        try {
            console.log(process.env.image_destination)
            const response = await imgurUploader(req.file.buffer, { title: req.body.title }, process.env.imgur_ID);

            if (response) {
                req.file.path = response.link;
                next();
            }
            return res.status(501).json({'error': 'Server error'});
        } catch (err) {
            return res.status(500).json(err);
        }
    } else if (image_destination !== 'imgur') {
        next();
    }
};
