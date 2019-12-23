const multer = require('multer');

if (process.env.NODE_ENV === 'test') {
    const storage = multer.diskStorage({
        destination: (req, file, next) => {
            next(null, 'test/userImages')
        },
        filename: (req, file, next) => {
            const ext = file.mimetype.split('/')[1];
            next(null, 'mock.' + ext);
        }
    });

    module.exports = multer({storage});

} else {
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
}
