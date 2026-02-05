const express=require("express")
const cityController=require("../controller/city.controller")
const router=express.Router()

router.get('/',cityController.getAllcity)
router.get('/:id',cityController.getCityById)
router.post('/',cityController.addCity)
router.put('/:id',cityController.updateCity)
router.delete('/:id',cityController.removeCity)

module.exports=router