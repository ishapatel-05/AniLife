const db = require("../config/db")

// GET all active volunteers
function getAllVolunteers(req, res) {
    db.query(`SELECT v.volunteerId, v.uid, v.areaid, v.skills, 
              v.availability, v.experienceYears, v.contactNumber, 
              v.verifiedBy, v.verifiedOn, v.status, v.createdOn 
              FROM volunteer as v 
              WHERE v.isActive = 1`, (err, result) => {
        if (err) return res.status(500).json(err)
        return res.json(result)
    })
}

// GET volunteer by ID
function getVolunteerById(req, res) {
    const { id } = req.params
    db.query(`SELECT * FROM volunteer WHERE volunteerId = ? AND isActive = 1`,
        [id], (err, result) => {
            if (err) return res.status(500).json(err)
            if (result.length == 0)
                return res.json({ message: "No record found" })
            return res.json(result[0])
        })
}

// GET volunteers by STATUS (Approved/Pending/Rejected)
function getVolunteerByStatus(req, res) {
    const { status } = req.params
    db.query(`SELECT * FROM volunteer WHERE status = ? AND isActive = 1`,
        [status], (err, result) => {
            if (err) return res.status(500).json(err)
            if (result.length == 0)
                return res.json({ message: "No volunteers found" })
            return res.json(result)
        })
}

// POST - Insert new volunteer
function insertVolunteer(req, res) {
    const { uid, areaid, skills, availability, 
            experienceYears, contactNumber } = req.body

    if (!uid || !areaid || !skills || !contactNumber) {
        return res.status(400).json({ error: "All required fields must be filled" })
    }

    const createdOn = new Date()
    const status = "Pending" // default status

    db.query(`INSERT INTO volunteer 
        (uid, areaid, skills, availability, experienceYears, 
        contactNumber, status, createdOn, isActive) 
        VALUES (?,?,?,?,?,?,?,?,1)`,
        [uid, areaid, skills, availability, experienceYears, 
        contactNumber, status, createdOn],
        (err) => {
            if (err) return res.status(500).json(err)
            return res.json({ message: "Volunteer registered successfully" })
        })
}

// PUT - Update volunteer
function updateVolunteer(req, res) {
    const { id } = req.params
    const { skills, availability, experienceYears, 
            contactNumber, status, verifiedBy } = req.body

    const updatedOn = new Date()
    const verifiedOn = status === "Approved" ? new Date() : null

    db.query(`UPDATE volunteer SET skills=?, availability=?, 
              experienceYears=?, contactNumber=?, status=?, 
              verifiedBy=?, verifiedOn=?, updatedOn=? 
              WHERE volunteerId=?`,
        [skills, availability, experienceYears, contactNumber, 
        status, verifiedBy, verifiedOn, updatedOn, id],
        (err) => {
            if (err) return res.status(500).json(err)
            return res.json({ message: "Volunteer updated successfully" })
        })
}

// DELETE - Soft delete
function removeVolunteer(req, res) {
    const { id } = req.params
    db.query("UPDATE volunteer SET isActive=0 WHERE volunteerId=?", [id], (err) => {
        if (err) return res.status(500).json(err)
        return res.json({ message: "Volunteer deleted successfully" })
    })
}

module.exports = {
    getAllVolunteers,
    getVolunteerById,
    getVolunteerByStatus,
    insertVolunteer,
    updateVolunteer,
    removeVolunteer
}