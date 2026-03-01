const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname)
        cb(null, uniqueName)
    }
})

const upload = multer({ storage })
module.exports = upload


// Show image only if ngopic exists
// {ngo.ngopic ? 
//     <img src={`http://localhost:5000/uploads/${ngo.ngopic}`} /> 
//     : 
//     <img src="/default-ngo.png" />  // show default image
// }