const express=require("express")

const stateController=require("../controller/state.contoller")
const router=express.Router()

router.get('/',stateController.getAllstate)
router.get('/:id',stateController.getStateById)
router.post('/',stateController.addState)
router.put('/:id',stateController.upstate)
router.delete('/:id',stateController.removestate)

module.exports=router