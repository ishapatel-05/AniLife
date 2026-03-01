const express = require("express")
const vetController = require("../controller/vetinfo.contoller")
const router = express.Router()

router.get('/', vetController.getAllVets)
router.get('/:id', vetController.getVetById)
router.post('/', vetController.insertVet)
router.put('/:id', vetController.updateVet)
router.delete('/:id', vetController.removeVet)

module.exports = router