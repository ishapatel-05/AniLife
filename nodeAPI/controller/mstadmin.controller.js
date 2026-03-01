const db = require("../config/db")

// GET all admins
function getAllAdmins(req, res) {
    db.query("SELECT id, fname, lname, email FROM mstadmin", (err, result) => {
        if (err) return res.status(500).json(err)
        return res.json(result)
    })
}

// GET admin by ID
function getAdminById(req, res) {
    const { id } = req.params
    db.query("SELECT id, fname, lname, email FROM mstadmin WHERE id=?", [id], (err, result) => {
        if (err) return res.status(500).json(err)
        if (result.length == 0)
            return res.json({ message: "No record found" })
        return res.json(result[0])
    })
}

// POST - Add new admin
function insertAdmin(req, res) {
    const { fname, lname, email, password } = req.body

    if (!fname || !lname || !email || !password) {
        return res.status(400).json({ error: "All fields are required" })
    }

    db.query("INSERT INTO mstadmin (fname, lname, email, password) VALUES (?,?,?,?)",
        [fname, lname, email, password], (err) => {
            if (err) return res.status(500).json(err)
            return res.json({ message: "Admin added successfully" })
        })
}

// PUT - Update admin
function updateAdmin(req, res) {
    const { id } = req.params
    const { fname, lname, email } = req.body

    db.query("UPDATE mstadmin SET fname=?, lname=?, email=? WHERE id=?",
        [fname, lname, email, id], (err) => {
            if (err) return res.status(500).json(err)
            return res.json({ message: "Admin updated successfully" })
        })
}

// DELETE - Hard delete
function removeAdmin(req, res) {
    const { id } = req.params
    db.query("DELETE FROM mstadmin WHERE id=?", [id], (err) => {
        if (err) return res.status(500).json(err)
        return res.json({ message: "Admin deleted successfully" })
    })
}

// LOGIN - same style as  reference
function checkAdmin(req, res) {
    const { email, password } = req.body
    db.query(`SELECT * FROM mstadmin 
              WHERE email=? AND password=?`,
        [email, password], (err, result) => {
            if (err) return res.status(500).json(err)
            if (result.length == 0)
                return res.json({ message: false })  
            else
                return res.json({ message: true, admin: result[0] })
        })
}

module.exports = {
    getAllAdmins,
    getAdminById,
    insertAdmin,
    updateAdmin,
    removeAdmin,
    checkAdmin
}