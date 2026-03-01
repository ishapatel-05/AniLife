const express = require("express")
const adminController = require("../controller/mstadmin.controller")
const router = express.Router()

router.get('/', adminController.getAllAdmins)
router.get('/:id', adminController.getAdminById)
router.post('/', adminController.insertAdmin)
router.post('/login', adminController.checkAdmin)  // ← login route
router.put('/:id', adminController.updateAdmin)
router.delete('/:id', adminController.removeAdmin)

module.exports = router