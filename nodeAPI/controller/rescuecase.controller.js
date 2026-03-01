const db = require("../config/db")

// GET all active rescue cases
function getAllRescueCases(req, res) {
    db.query(`SELECT * FROM rescuecase WHERE isActive=1`,
        (err, result) => {
            if (err) return res.status(500).json(err)
            return res.json(result)
        })
}

// GET rescue case by ID
function getRescueCaseById(req, res) {
    const { id } = req.params
    db.query(`SELECT * FROM rescuecase WHERE rescueId=? AND isActive=1`,
        [id], (err, result) => {
            if (err) return res.status(500).json(err)
            if (result.length == 0)
                return res.json({ message: "No record found" })
            return res.json(result[0])
        })
}

// GET rescue cases by STATUS
function getRescueCaseByStatus(req, res) {
    const { status } = req.params
    db.query(`SELECT * FROM rescuecase WHERE status=? AND isActive=1`,
        [status], (err, result) => {
            if (err) return res.status(500).json(err)
            if (result.length == 0)
                return res.json({ message: "No cases found" })
            return res.json(result)
        })
}

// POST - Insert rescue case with image
function insertRescueCase(req, res) {
    const { uid, animalType, description, areaid, 
            locationDetails, createdBy } = req.body
    const rescuePic = req.file ? req.file.filename : null

    if (!uid || !animalType || !description || !areaid) {
        return res.status(400).json({ error: "All required fields must be filled" })
    }

    const createdOn = new Date()
    const status = "Pending"

    db.query(`INSERT INTO rescuecase 
        (uid, animalType, description, areaid, locationDetails, 
        rescuePic, status, createdBy, createdOn, isActive) 
        VALUES (?,?,?,?,?,?,?,?,?,1)`,
        [uid, animalType, description, areaid, locationDetails,
        rescuePic, status, createdBy, createdOn],
        (err) => {
            if (err) return res.status(500).json(err)
            return res.json({ message: "Rescue case submitted successfully" })
        })
}

// PUT - Update status (Assign/Rescue)
function updateRescueCase(req, res) {
    const { id } = req.params
    const { status, assignedToType, assignedToId, 
            assignedBy, rescuedOn, updatedBy } = req.body

    const updatedOn = new Date()
    const assignedOn = assignedToId ? new Date() : null

    db.query(`UPDATE rescuecase SET status=?, assignedToType=?, 
              assignedToId=?, assignedOn=?, assignedBy=?, 
              rescuedOn=?, updatedBy=?, updatedOn=? 
              WHERE rescueId=?`,
        [status, assignedToType, assignedToId, assignedOn,
        assignedBy, rescuedOn, updatedBy, updatedOn, id],
        (err) => {
            if (err) return res.status(500).json(err)
            return res.json({ message: "Rescue case updated successfully" })
        })
}

// DELETE - Soft delete
function removeRescueCase(req, res) {
    const { id } = req.params
    db.query("UPDATE rescuecase SET isActive=0 WHERE rescueId=?", [id], (err) => {
        if (err) return res.status(500).json(err)
        return res.json({ message: "Rescue case deleted successfully" })
    })
}


// PUT - Update image only
function updateRescueImage(req, res) {
    const { id } = req.params
    const rescuePic = req.file ? req.file.filename : null

    if (!rescuePic) {
        return res.status(400).json({ error: "Please select an image" })
    }

    db.query(`UPDATE rescuecase SET rescuePic=? WHERE rescueId=?`,
        [rescuePic, id], (err) => {
            if (err) return res.status(500).json(err)
            return res.json({ message: "Rescue image updated successfully" })
        })
}
module.exports = {
    getAllRescueCases,
    getRescueCaseById,
    getRescueCaseByStatus,
    insertRescueCase,
    updateRescueCase,
    removeRescueCase,
    updateRescueImage
}