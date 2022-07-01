const multer = require('multer')
const path = require('path')
const { now } = require('mongoose')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) =>{
        console.log(cb)
        cb(null,Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage:storage
})

module.exports = upload
