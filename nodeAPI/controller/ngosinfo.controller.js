const db = require("../config/db")

// GET all active NGOs
// function getAllNgos(req, res) {
//     db.query(`SELECT n.ngoid, n.ngoname, n.contact, n.email, 
//               n.address, n.areaid, n.services, 
//               n.createdby, n.createdon, n.isActive 
//               FROM ngosinfo as n 
//               WHERE n.isActive = 1`, (err, result) => {
//         if (err) return res.status(500).json(err)
//         return res.json(result)
//     })
// }



// function getAllNgos(req, res) {
function getAllNgos(req, res) {
    db.query(`SELECT n.ngoid, n.ngoname, n.contact, n.email, 
              n.address, n.areaid, a.areaname, n.services, 
              n.isActive 
              FROM ngosinfo as n 
              LEFT JOIN area as a ON n.areaid = a.areaid
              WHERE n.isActive = 1`,
        (err, result) => {
            if (err) return res.status(500).json(err)
            return res.json(result)
        })
}
// GET NGO by ID
function getNgoById(req, res) {
    const { id } = req.params
    db.query(`SELECT * FROM ngosinfo WHERE ngoid = ? AND isActive = 1`,
        [id], (err, result) => {
            if (err) return res.status(500).json(err)
            if (result.length == 0)
                return res.json({ message: "No record found" })
            return res.json(result[0])
        })
}

// POST - Insert new NGO
function insertNgo(req, res) {
    const { ngoname, contact, email, address, areaid, services, createdby } = req.body

    if (!ngoname || !contact || !email || !address || !areaid) {
        return res.status(400).json({ error: "All fields are required" })
    }

    const createdon = new Date().toISOString().split('T')[0]

    db.query(`INSERT INTO ngosinfo 
        (ngoname, contact, email, address, areaid, services, createdby, createdon, isActive) 
        VALUES (?,?,?,?,?,?,?,?,1)`,
        [ngoname, contact, email, address, areaid, services, createdby, createdon],
        (err) => {
            if (err) return res.status(500).json(err)
            return res.json({ message: "NGO inserted successfully" })
        })
}

// PUT - Update NGO
function updateNgo(req, res) {
    const { id } = req.params
    const { ngoname, contact, email, address, areaid, services, updatedby } = req.body

    const updatedon = new Date().toISOString().split('T')[0]

   db.query(`UPDATE ngosinfo SET ngoname=?, contact=?, email=?, 
          address=?, areaid=?, services=?, updatedby=1, updatedon=? 
          WHERE ngoid=?`,
    [ngoname, contact, email, address, areaid, services, updatedon, id],
        (err) => {
            if (err) return res.status(500).json(err)
            return res.json({ message: "NGO updated successfully" })
        })
}

// DELETE - Soft delete
function removeNgo(req, res) {
    const { id } = req.params
    db.query("UPDATE ngosinfo SET isActive=0 WHERE ngoid=?", [id], (err) => {
        if (err) return res.status(500).json(err)
        return res.json({ message: "NGO deleted successfully" })
    })
}

module.exports = {
    getAllNgos,
    getNgoById,
    insertNgo,
    updateNgo,
    removeNgo
}