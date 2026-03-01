const express = require("express")
const categoryController = require("../controller/animalcategory.controller")
const upload = require("../config/multerConfig")
const router = express.Router()

router.get('/', categoryController.getAllCategories)
router.get('/:id', categoryController.getCategoryById)
router.post('/', upload.single('categorypic'), categoryController.insertCategory)
router.put('/:id', upload.single('categorypic'), categoryController.updateCategory)
router.delete('/:id', categoryController.removeCategory)

module.exports = router