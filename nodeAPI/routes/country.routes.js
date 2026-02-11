const express=require("express")
const router=express.Router()

const cnController=require("../controller/country.controller")

router.get('/',cnController.getAllcn)

router.get('/:id',cnController.getCnById)
router.post('/',cnController.insertCn)
router.put('/:id',cnController.updateCn)

  
router.delete('/:id',cnController.removeCn)

module.exports=router