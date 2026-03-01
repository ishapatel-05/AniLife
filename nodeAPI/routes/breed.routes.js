const express=require("express")
const breedController=require("../controller/breed.controller")
const router=express.Router()

router.get('/',breedController.getAllBreeds)
router.get('/:id',breedController.getBreedById)
router.post('/',breedController.insertBreed)
router.put('/:id',breedController.updateBreed)
router.delete('/:id',breedController.removeBreed)

module.exports=router