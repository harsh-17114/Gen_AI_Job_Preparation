const multer = require("multer")

const upload = multer({
    // Store uploaded files temporarily in memory as a Buffer
    storage: multer.memoryStorage(),

    // Limit the maximum file size to 10 MB
    limits: {
        fileSize: 10 * 1024 * 1024
    },

    // Validate the type of file being uploaded
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("application/pdf")) {
            cb(null, true)
        }
        else {
            cb(new Error("Only pdf files are allowed."), false)
        }
    }
})

module.exports = upload