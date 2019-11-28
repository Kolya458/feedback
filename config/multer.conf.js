const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, 'images')
    },
    filename: (req, file, next) => {
        const ext = file.mimetype.split('/')[1];
        next(null, file.fieldname + '-' + req.user.id + '.' + ext);
    }
});

module.exports = multer({storage});