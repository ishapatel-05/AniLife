const express = require("express")
const petController = require("../controller/petlisting.controller")
const upload = require("../config/multerConfig")
const router = express.Router()

router.get('/', petController.getAllPets)
router.get('/:id', petController.getPetById)
router.get('/category/:catid', petController.getPetByCategory)
router.post('/', upload.single('petPic'), petController.insertPet)
router.put('/:id', upload.single('petPic'), petController.updatePet)
router.delete('/:id', petController.removePet)
router.put('/image/:id', upload.single('petPic'), petController.updatePetImage)


module.exports = router