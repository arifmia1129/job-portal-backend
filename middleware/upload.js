const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "resume/",
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        if (extension == ".pdf") {
            cb(null, true)
        }
        else {
            cb(new Error("File format must be pdf"))
        }
    },
    limits: {
        fileSize: 10000000
    }
})


module.exports = upload;