const express = require("express")
const donationController = require("../controller/donation.controoler")
const router = express.Router()

router.get('/', donationController.getAllDonations)
router.get('/:id', donationController.getDonationById)
router.get('/user/:uid', donationController.getDonationByUser)
router.get('/ngo/:ngoid', donationController.getDonationByNgo)
router.post('/', donationController.insertDonation)
router.put('/:id', donationController.updateDonation)
router.delete('/:id', donationController.removeDonation)

module.exports = router