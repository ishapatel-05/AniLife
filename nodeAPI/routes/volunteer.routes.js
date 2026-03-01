const express = require("express")
const volunteerController = require("../controller/volunteer.controller")
const router = express.Router()

router.get('/', volunteerController.getAllVolunteers)
router.get('/:id', volunteerController.getVolunteerById)
router.get('/status/:status', volunteerController.getVolunteerByStatus)
router.post('/', volunteerController.insertVolunteer)
router.put('/:id', volunteerController.updateVolunteer)
router.delete('/:id', volunteerController.removeVolunteer)

module.exports = router