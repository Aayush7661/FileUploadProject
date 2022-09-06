const multer = require("multer");


const storage_banner = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, process.env.FILE_PATH);
    },
    filename: function(req, file, cb) {
        const imageName = file.originalname.split(".");
        const extension = imageName[imageName.length - 1];

        cb(null, `${Date.now()}.${extension}`);
    },
});

exports.upload_images = multer({
    storage: storage_banner,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    },

});