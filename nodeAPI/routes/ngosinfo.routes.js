const express = require("express")
const ngoController = require("../controller/ngosinfo.controller")
const router = express.Router()

router.get('/', ngoController.getAllNgos)
router.get('/:id', ngoController.getNgoById)
router.post('/', ngoController.insertNgo)
router.put('/:id', ngoController.updateNgo)
router.delete('/:id', ngoController.removeNgo)

module.exports = router