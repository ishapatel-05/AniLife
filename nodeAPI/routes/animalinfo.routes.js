const express = require("express")
const animalInfoController = require("../controller/animalinfo.controller")
const router = express.Router()

router.get('/', animalInfoController.getAllAnimalInfo)
router.get('/:id', animalInfoController.getAnimalInfoById)
router.get('/breed/:breedid', animalInfoController.getAnimalInfoByBreed)
router.post('/', animalInfoController.insertAnimalInfo)
router.put('/:id', animalInfoController.updateAnimalInfo)
router.delete('/:id', animalInfoController.removeAnimalInfo)

module.exports = router