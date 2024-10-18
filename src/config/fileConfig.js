const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'./src/public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+'__' + file.originalname)
    }
})
 module.exports = upload = multer({storage: storage})