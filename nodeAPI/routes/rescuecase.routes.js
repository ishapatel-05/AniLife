const express = require("express")
const rescueController = require("../controller/rescuecase.controller")
const upload = require("../config/multerConfig")
const router = express.Router()

router.get('/', rescueController.getAllRescueCases)
router.get('/:id', rescueController.getRescueCaseById)
router.get('/status/:status', rescueController.getRescueCaseByStatus)
router.post('/', upload.single('rescuePic'), rescueController.insertRescueCase)
router.put('/:id', rescueController.updateRescueCase)
router.delete('/:id', rescueController.removeRescueCase)
router.put('/image/:id', upload.single('rescuePic'), rescueController.updateRescueImage)


module.exports = router

// Method: PUT
// URL: http://localhost:5000/api/rescue/image/1
// Body: form-data → rescuePic → File → select image
// ```
// GET http://localhost:5000/api/rescue/status/Pending
// GET http://localhost:5000/api/rescue/status/Assigned

// Method: PUT
// URL: http://localhost:5000/api/rescue/1
// Body: raw → JSON
// json{
//     "status": "Assigned",
//     "assignedToType": "NGO",
//     "assignedToId": 2,
//     "assignedBy": 1
// }

// ```
// Method: POST
// URL: http://localhost:5000/api/rescue
// Body: form-data
// ```

// | Key | Type | Value |
// |---|---|---|
// | uid | Text | 1 |
// | animalType | Text | Dog |
// | description | Text | Injured stray dog |
// | areaid | Text | 1 |
// | locationDetails | Text | Near railway station |
// | createdBy | Text | 1 |
// | **rescuePic** | **File** | 📎 select image |


// APICorrect key name
// rescuecase rescuePic 
// petlisting petPicanimal
// category categorypic
// userprofile picture

// Check in Postman: