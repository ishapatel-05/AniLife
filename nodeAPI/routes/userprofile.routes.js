const express = require("express")
const profileController = require("../controller/userprofile.controller")
const upload = require("../config/multerConfig")
const router = express.Router()

router.get('/', profileController.getAllProfiles)
router.get('/:id', profileController.getProfileById)
router.get('/user/:uid', profileController.getProfileByUser)
router.post('/', upload.single('picture'), profileController.insertProfile)
router.put('/:id', upload.single('picture'), profileController.updateProfile)
router.delete('/:id', profileController.removeProfile)

module.exports = router