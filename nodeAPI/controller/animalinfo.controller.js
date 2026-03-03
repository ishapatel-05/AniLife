const db = require("../config/db")

// GET all active animalinfo with breed name (JOIN)
function getAllAnimalInfo(req, res) {
    db.query(`SELECT ai.infoid, ai.breedid, b.breedname, ai.title,
       ai.nutrition, ai.diseases, ai.vaccines, ai.firstaid
        FROM animalinfo ai
    INNER JOIN breed b ON ai.breedid = b.breedid
    WHERE ai.isActive = 1`, (err, result) => {
        if (err) return res.status(500).json(err)
        return res.json(result)
    })
}

// GET animalinfo by ID
function getAnimalInfoById(req, res) {
    const { id } = req.params
    db.query(`SELECT ai.infoid, b.breedname, ai.title, ai.nutrition, 
              ai.diseases, ai.vaccines, ai.firstaid 
              FROM animalinfo as ai 
              INNER JOIN breed as b ON ai.breedid = b.breedid 
              WHERE ai.infoid = ? AND ai.isActive = 1`,
        [id], (err, result) => {
            if (err) return res.status(500).json(err)
            if (result.length == 0)
                return res.json({ message: "No record found" })
            return res.json(result[0])
        })
}

// GET animalinfo by BREED
function getAnimalInfoByBreed(req, res) {
    const { breedid } = req.params
    db.query(`SELECT ai.infoid, ai.breedid, b.breedname, ai.title,
       ai.nutrition, ai.diseases, ai.vaccines, ai.firstaid
        FROM animalinfo ai
    INNER JOIN breed b ON ai.breedid = b.breedid
    WHERE ai.isActive = 1`,
        [breedid], (err, result) => {
            if (err) return res.status(500).json(err)
            if (result.length == 0)
                return res.json({ message: "No record found for this breed" })
            return res.json(result)
        })
}

// POST - Insert new animalinfo
function insertAnimalInfo(req, res) {
    const { breedid, title, nutrition, diseases,
        vaccines, firstaid, createdby } = req.body

    if (!breedid || !title) {
        return res.status(400).json({ error: "Breed and title are required" })
    }

    const createdon = new Date()

    db.query(`INSERT INTO animalinfo 
    (breedid, title, nutrition, diseases, vaccines, 
    firstaid, createdby, createdon, isActive) 
    VALUES (?,?,?,?,?,?,?,?,1)`,
        [
            breedid,
            title,
            nutrition,
            diseases,
            vaccines,
            firstaid,
            1, // 👈 hardcode admin id for now
            createdon
        ],
        (err) => {
            if (err) return res.status(500).json(err)
            return res.json({ message: "Animal info inserted successfully" })
        })
}

// PUT - Update animalinfo
function updateAnimalInfo(req, res) {
    const { id } = req.params
    const { breedid, title, nutrition, diseases,
        vaccines, firstaid, updatedby } = req.body

    const updatedon = new Date()

    db.query(`UPDATE animalinfo SET breedid=?, title=?, nutrition=?, 
              diseases=?, vaccines=?, firstaid=?, 
              updatedby=?, updatedon=? 
              WHERE infoid=?`,
        [breedid, title, nutrition, diseases, vaccines,
            firstaid, updatedby, updatedon, id],
        (err) => {
            if (err) return res.status(500).json(err)
            return res.json({ message: "Animal info updated successfully" })
        })
}

// DELETE - Soft delete
function removeAnimalInfo(req, res) {
    const { id } = req.params
    db.query("UPDATE animalinfo SET isActive=0 WHERE infoid=?", [id], (err) => {
        if (err) return res.status(500).json(err)
        return res.json({ message: "Animal info deleted successfully" })
    })
}

module.exports = {
    getAllAnimalInfo,
    getAnimalInfoById,
    getAnimalInfoByBreed,
    insertAnimalInfo,
    updateAnimalInfo,
    removeAnimalInfo
}