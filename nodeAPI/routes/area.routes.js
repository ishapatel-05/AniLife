const express=require("express")
const areaController=require("../controller/area.controller")
const router=express.Router()

router.get('/',areaController.getAllarea)
router.get('/:id',areaController.getAreaById)
router.post('/',areaController.addArea)
router.put('/:id',areaController.updateArea)
router.delete('/:id',areaController.removeArea)

module.exports=router