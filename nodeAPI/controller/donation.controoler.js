const db = require("../config/db")

// GET all donations

function getAllDonations(req, res) {
    db.query(`SELECT d.*, 
              CONCAT(u.fname,' ',u.lname) as username,
              n.ngoname,
              p.paymentmethodname
              FROM donation d
              LEFT JOIN mstuser u ON d.uid = u.uid
              LEFT JOIN ngosinfo n ON d.ngoid = n.ngoid
              LEFT JOIN paymentmethod p ON d.pmid = p.pmid`, 
              (err, result) => {
        if (err) return res.status(500).json(err)
        return res.json(result)
    })
}
// function getAllDonations(req, res) {
//     db.query(`SELECT d.donationid, d.uid, d.ngoid, d.amount, 
//               d.pmid, d.transactionid, d.donationdate, 
//               d.createdby, d.createdon 
//               FROM donation as d`, (err, result) => {
//         if (err) return res.status(500).json(err)
//         return res.json(result)
//     })
// }

// GET donation by ID
function getDonationById(req, res) {
    const { id } = req.params
    db.query(`SELECT * FROM donation WHERE donationid = ?`, [id], (err, result) => {
        if (err) return res.status(500).json(err)
        if (result.length == 0)
            return res.json({ message: "No record found" })
        return res.json(result[0])
    })
}

// GET donations by USER
function getDonationByUser(req, res) {
    const { uid } = req.params
    db.query(`SELECT * FROM donation WHERE uid = ?`, [uid], (err, result) => {
        if (err) return res.status(500).json(err)
        if (result.length == 0)
            return res.json({ message: "No donations found for this user" })
        return res.json(result)
    })
}

// GET donations by NGO
function getDonationByNgo(req, res) {
    const { ngoid } = req.params
    db.query(`SELECT * FROM donation WHERE ngoid = ?`, [ngoid], (err, result) => {
        if (err) return res.status(500).json(err)
        if (result.length == 0)
            return res.json({ message: "No donations found for this NGO" })
        return res.json(result)
    })
}

// POST - Insert new donation
function insertDonation(req, res) {
    const { uid, ngoid, amount, pmid, transactionid, donationdate, createdby } = req.body

    if (!uid || !ngoid || !amount || !pmid || !transactionid || !donationdate) {
        return res.status(400).json({ error: "All fields are required" })
    }

    const createdon = new Date().toISOString().split('T')[0]

    db.query(`INSERT INTO donation 
        (uid, ngoid, amount, pmid, transactionid, donationdate, createdby, createdon) 
        VALUES (?,?,?,?,?,?,?,?)`,
        [uid, ngoid, amount, pmid, transactionid, donationdate, createdby, createdon],
        (err) => {
            if (err) return res.status(500).json(err)
            return res.json({ message: "Donation inserted successfully" })
        })
}

// PUT - Update donation
function updateDonation(req, res) {
    const { id } = req.params
    const { uid, ngoid, amount, pmid, transactionid, donationdate } = req.body

    db.query(`UPDATE donation SET uid=?, ngoid=?, amount=?, pmid=?, 
              transactionid=?, donationdate=? WHERE donationid=?`,
        [uid, ngoid, amount, pmid, transactionid, donationdate, id],
        (err) => {
            if (err) return res.status(500).json(err)
            return res.json({ message: "Donation updated successfully" })
        })
}

// DELETE - Hard delete
function removeDonation(req, res) {
    const { id } = req.params
    db.query("DELETE FROM donation WHERE donationid=?", [id], (err) => {
        if (err) return res.status(500).json(err)
        return res.json({ message: "Donation deleted successfully" })
    })
}

module.exports = {
    getAllDonations,
    getDonationById,
    getDonationByUser,
    getDonationByNgo,
    insertDonation,
    updateDonation,
    removeDonation
}