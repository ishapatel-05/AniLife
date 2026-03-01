const express=require("express")
const paymentMethodController=require("../controller/paymentmethod.controller")
const router=express.Router()

router.get('/',paymentMethodController.getAllPaymentMethods)
router.get('/:id',paymentMethodController.getPaymentMethodById)
router.post('/',paymentMethodController.insertPaymentMethod)
router.put('/:id',paymentMethodController.updatePaymentMethod)
router.delete('/:id',paymentMethodController.removePaymentMethod)

module.exports=router