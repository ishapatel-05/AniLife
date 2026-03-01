const express = require("express")
const adoptionController = require("../controller/adoptionrequest.controller")
const router = express.Router()

router.get('/', adoptionController.getAllRequests)
router.get('/:id', adoptionController.getRequestById)
router.get('/status/:status', adoptionController.getRequestByStatus)
router.get('/adopter/:adopterId', adoptionController.getRequestByAdopter)
router.post('/', adoptionController.insertRequest)
router.put('/:id', adoptionController.updateRequest)
router.delete('/:id', adoptionController.removeRequest)

module.exports = router