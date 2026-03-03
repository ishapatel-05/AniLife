const db = require("../config/db")

// GET all active requests
function getAllRequests(req, res) {
    db.query(`SELECT a.*, 
              p.name as petname, p.petPic,
              CONCAT(u.fname,' ',u.lname) as adoptername
              FROM adoptionrequest a
              LEFT JOIN petlisting p ON a.petId = p.petId
              LEFT JOIN mstuser u ON a.adopterId = u.uid
              WHERE a.isActive=1`, (err, result) => {
        if (err) return res.status(500).json(err)
        return res.json(result)
    })
}
// function getAllRequests(req, res) {
//     db.query(`SELECT * FROM adoptionrequest WHERE isActive=1`,
//         (err, result) => {
//             if (err) return res.status(500).json(err)
//             return res.json(result)
//         })
// }

// GET request by ID
function getRequestById(req, res) {
    const { id } = req.params
    db.query(`SELECT * FROM adoptionrequest WHERE adoptionId=? AND isActive=1`,
        [id], (err, result) => {
            if (err) return res.status(500).json(err)
            if (result.length == 0)
                return res.json({ message: "No record found" })
            return res.json(result[0])
        })
}

// GET requests by status

function getRequestByStatus(req, res) {
    const { status } = req.params
    db.query(`SELECT * FROM adoptionrequest WHERE status=? AND isActive=1`,
        [status], (err, result) => {
            if (err) return res.status(500).json(err)
            if (result.length == 0)
                return res.json({ message: "No requests found" })
            return res.json(result)
        })
}

// GET requests by adopter
function getRequestByAdopter(req, res) {
    const { adopterId } = req.params
    db.query(`SELECT * FROM adoptionrequest WHERE adopterId=? AND isActive=1`,
        [adopterId], (err, result) => {
            if (err) return res.status(500).json(err)
            if (result.length == 0)
                return res.json({ message: "No requests found" })
            return res.json(result)
        })
}

// POST - Insert new request
function insertRequest(req, res) {
    const { petId, adopterId, ownerType, ownerId, userNotes } = req.body

    if (!petId || !adopterId || !ownerType || !ownerId) {
        return res.status(400).json({ error: "All fields are required" })
    }

    const requestDate = new Date()
    const createdOn = new Date()
    const status = "Pending"

    db.query(`INSERT INTO adoptionrequest 
        (petId, adopterId, ownerType, ownerId, requestDate, 
        status, userNotes, createdOn, isActive) 
        VALUES (?,?,?,?,?,?,?,?,1)`,
        [petId, adopterId, ownerType, ownerId, requestDate,
        status, userNotes, createdOn],
        (err) => {
            if (err) return res.status(500).json(err)
            return res.json({ message: "Adoption request submitted successfully" })
        })
}

// PUT - Approve or Reject request
function updateRequest(req, res) {
    const { id } = req.params
    const { status, rejectionReason, approvedBy } = req.body

    const updatedOn = new Date()
    const approvalDate = status === "Approved" ? new Date() : null

    db.query(`UPDATE adoptionrequest SET status=?, rejectionReason=?, 
              approvedBy=?, approvalDate=?, updatedOn=? 
              WHERE adoptionId=?`,
        [status, rejectionReason, approvedBy, approvalDate, updatedOn, id],
        (err) => {
            if (err) return res.status(500).json(err)
            return res.json({ message: "Request updated successfully" })
        })
}

// DELETE - Soft delete
function removeRequest(req, res) {
    const { id } = req.params
    db.query("UPDATE adoptionrequest SET isActive=0 WHERE adoptionId=?", [id], (err) => {
        if (err) return res.status(500).json(err)
        return res.json({ message: "Request deleted successfully" })
    })
}

module.exports = {
    getAllRequests,
    getRequestById,
    getRequestByStatus,
    getRequestByAdopter,
    insertRequest,
    updateRequest,
    removeRequest
}