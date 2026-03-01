const db = require("../config/db")

// GET all active vets
function getAllVets(req, res) {
    db.query(`SELECT v.vetid, v.vetname, v.contact, v.email, 
              v.address, v.areaid, v.specialization, 
              v.yearsofexperience, v.availability, v.isActive 
              FROM vetinfo as v 
              WHERE v.isActive = 1`, (err, result) => {
        if (err) return res.status(500).json(err)
        return res.json(result)
    })
}

// GET vet by ID
function getVetById(req, res) {
    const { id } = req.params
    db.query(`SELECT * FROM vetinfo WHERE vetid = ? AND isActive = 1`,
        [id], (err, result) => {
            if (err) return res.status(500).json(err)
            if (result.length == 0)
                return res.json({ message: "No record found" })
            return res.json(result[0])
        })
}

// POST - Insert new vet
function insertVet(req, res) {
    const { vetname, contact, email, address, areaid, 
            specialization, yearsofexperience, availability, createdby } = req.body

    if (!vetname || !contact || !email || !areaid) {
        return res.status(400).json({ error: "All required fields must be filled" })
    }

    const createdon = new Date().toISOString().split('T')[0]

    db.query(`INSERT INTO vetinfo 
        (vetname, contact, email, address, areaid, specialization, 
        yearsofexperience, availability, createdby, createdon, isActive) 
        VALUES (?,?,?,?,?,?,?,?,?,?,1)`,
        [vetname, contact, email, address, areaid, specialization,
        yearsofexperience, availability, createdby, createdon],
        (err) => {
            if (err) return res.status(500).json(err)
            return res.json({ message: "Vet inserted successfully" })
        })
}

// PUT - Update vet
function updateVet(req, res) {
    const { id } = req.params
    const { vetname, contact, email, address, areaid, 
            specialization, yearsofexperience, availability, updatedby } = req.body

    const updatedon = new Date().toISOString().split('T')[0]

    db.query(`UPDATE vetinfo SET vetname=?, contact=?, email=?, address=?, 
              areaid=?, specialization=?, yearsofexperience=?, 
              availability=?, updatedby=?, updatedon=? 
              WHERE vetid=?`,
        [vetname, contact, email, address, areaid, specialization,
        yearsofexperience, availability, updatedby, updatedon, id],
        (err) => {
            if (err) return res.status(500).json(err)
            return res.json({ message: "Vet updated successfully" })
        })
}

// DELETE - Soft delete
function removeVet(req, res) {
    const { id } = req.params
    db.query("UPDATE vetinfo SET isActive=0 WHERE vetid=?", [id], (err) => {
        if (err) return res.status(500).json(err)
        return res.json({ message: "Vet deleted successfully" })
    })
}

module.exports = {
    getAllVets,
    getVetById,
    insertVet,
    updateVet,
    removeVet
}