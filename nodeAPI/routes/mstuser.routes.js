const express = require("express")
const userController = require("../controller/mstuser.controller")
const router = express.Router()

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)
router.post('/', userController.insertUser)
router.post('/login', userController.checkUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.removeUser)

module.exports = router