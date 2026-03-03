const db = require("../config/db")

// GET all active pets
function getAllPets(req, res) {
    db.query(`SELECT p.*, c.catname, b.breedname, a.areaname
          FROM petlisting p
          INNER JOIN animalcategory c ON p.catId = c.catid
          INNER JOIN breed b ON p.breedId = b.breedid
          INNER JOIN area a ON p.areaid = a.areaid
          WHERE p.isActive = 1`, (err, result) => {
        if (err) return res.status(500).json(err)
        return res.json(result)
    })
}
// function getAllPets(req, res) {
//     db.query(`SELECT p.petId, p.listedByType, p.listedById, 
//               p.catId, p.breedId, p.name, p.age, p.gender, 
//               p.healthDetails, p.vaccinated, p.areaid, p.petPic,
//               p.adoptionFee, p.contactNumber, p.approvedBy, 
//               p.approvedOn, p.createdOn 
//               FROM petlisting as p 
//               WHERE p.isActive=1`, (err, result) => {
//         if (err) return res.status(500).json(err)
//         return res.json(result)
//     })
// }

// GET pet by ID
function getPetById(req, res) {
    const { id } = req.params
    db.query(`SELECT * FROM petlisting WHERE petId=? AND isActive=1`,
        [id], (err, result) => {
            if (err) return res.status(500).json(err)
            if (result.length == 0)
                return res.json({ message: "No record found" })
            return res.json(result[0])
        })
}

// GET pets by category
function getPetByCategory(req, res) {
    const { catid } = req.params
    db.query(`SELECT * FROM petlisting WHERE catId=? AND isActive=1`,
        [catid], (err, result) => {
            if (err) return res.status(500).json(err)
            if (result.length == 0)
                return res.json({ message: "No pets found" })
            return res.json(result)
        })
}

// POST - Insert pet with image
function insertPet(req, res) {
    const { listedByType, listedById, catId, breedId, name,
        age, gender, healthDetails, vaccinated, areaid,
        adoptionFee, contactNumber, approvedBy } = req.body
    const petPic = req.file ? req.file.filename : null

    if (!name || !catId || !breedId) {
        return res.status(400).json({ error: "Required fields missing" })
    }

    const createdOn = new Date()
    const approvedOn = approvedBy ? new Date() : null

    db.query(`INSERT INTO petlisting 
        (listedByType, listedById, catId, breedId, name, age, gender, 
        healthDetails, vaccinated, areaid, petPic, adoptionFee, 
        contactNumber, approvedBy, approvedOn, createdOn, isActive) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,1)`,
        [listedByType, listedById, catId, breedId, name, age, gender,
            healthDetails, vaccinated, areaid, petPic, adoptionFee,
            contactNumber, approvedBy, approvedOn, createdOn],
        (err) => {
            if (err) return res.status(500).json(err)
            return res.json({ message: "Pet listed successfully" })
        })
}

// PUT - Update pet with image
function updatePet(req, res) {
    const { id } = req.params
    const { name, age, gender, healthDetails, vaccinated,
        areaid, adoptionFee, contactNumber,
        listedByType, listedById } = req.body  // ✅ add these

    const petPic = req.file ? req.file.filename : req.body.old_picture
    const updatedOn = new Date()

    db.query(`UPDATE petlisting SET name=?, age=?, gender=?, 
              healthDetails=?, vaccinated=?, areaid=?, petPic=?, 
              adoptionFee=?, contactNumber=?, 
              listedByType=?, listedById=?,
              updatedOn=? 
              WHERE petId=?`,
        [name, age, gender, healthDetails, vaccinated, areaid,
            petPic, adoptionFee, contactNumber,
            listedByType, listedById,   // ✅ add these
            updatedOn, id],
        (err) => {
            if (err) return res.status(500).json(err)
            return res.json({ message: "Pet updated successfully" })
        })
}
// function updatePet(req, res) {
//     const { id } = req.params
//     const { name, age, gender, healthDetails, vaccinated,
//         areaid, adoptionFee, contactNumber } = req.body
//     const petPic = req.file ? req.file.filename : req.body.old_picture

//     const updatedOn = new Date()

//     db.query(`UPDATE petlisting SET name=?, age=?, gender=?, 
//               healthDetails=?, vaccinated=?, areaid=?, petPic=?, 
//               adoptionFee=?, contactNumber=?, updatedOn=? 
//               WHERE petId=?`,
//         [name, age, gender, healthDetails, vaccinated, areaid,
//             petPic, adoptionFee, contactNumber, updatedOn, id],
//         (err) => {
//             if (err) return res.status(500).json(err)
//             return res.json({ message: "Pet updated successfully" })
//         })
// }

// DELETE - Soft delete
function removePet(req, res) {
    const { id } = req.params
    db.query("UPDATE petlisting SET isActive=0 WHERE petId=?", [id], (err) => {
        if (err) return res.status(500).json(err)
        return res.json({ message: "Pet deleted successfully" })
    })
}



// PUT - Update image only
function updatePetImage(req, res) {
    const { id } = req.params
    const petPic = req.file ? req.file.filename : null

    if (!petPic) {
        return res.status(400).json({ error: "Please select an image" })
    }

    db.query(`UPDATE petlisting SET petPic=? WHERE petId=?`,
        [petPic, id], (err) => {
            if (err) return res.status(500).json(err)
            return res.json({ message: "Pet image updated successfully" })
        })
}

// add to module.exports

module.exports = {
    getAllPets,
    getPetById,
    getPetByCategory,
    insertPet,
    updatePet,
    removePet,
    updatePetImage

}