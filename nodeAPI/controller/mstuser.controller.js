const db = require("../config/db")

// GET all active users
function getAllUsers(req, res) {
    db.query("SELECT uid, fname, lname, email, contact, isActive FROM mstuser WHERE isActive=1",
        (err, result) => {
            if (err) return res.status(500).json(err)
            return res.json(result)
        })
}

// GET user by ID
function getUserById(req, res) {
    const { id } = req.params
    db.query("SELECT uid, fname, lname, email, contact FROM mstuser WHERE uid=? AND isActive=1",
        [id], (err, result) => {
            if (err) return res.status(500).json(err)
            if (result.length == 0)
                return res.json({ message: "No record found" })
            return res.json(result[0])
        })
}

// POST - Register new user
function insertUser(req, res) {
    const { fname, lname, email, contact, password } = req.body

    if (!fname || !lname || !email || !contact || !password) {
        return res.status(400).json({ error: "All fields are required" })
    }

    db.query("INSERT INTO mstuser (fname, lname, email, contact, password, isActive) VALUES (?,?,?,?,?,1)",
        [fname, lname, email, contact, password], (err) => {
            if (err) return res.status(500).json(err)
            return res.json({ message: "User registered successfully" })
        })
}

// PUT - Update user
function updateUser(req, res) {
    const { id } = req.params
    const { fname, lname, email, contact } = req.body

    db.query("UPDATE mstuser SET fname=?, lname=?, email=?, contact=? WHERE uid=?",
        [fname, lname, email, contact, id], (err) => {
            if (err) return res.status(500).json(err)
            return res.json({ message: "User updated successfully" })
        })
}

// DELETE - Soft delete
function removeUser(req, res) {
    const { id } = req.params
    db.query("UPDATE mstuser SET isActive=0 WHERE uid=?", [id], (err) => {
        if (err) return res.status(500).json(err)
        return res.json({ message: "User deleted successfully" })
    })
}

// LOGIN - same style as mstadmin!
function checkUser(req, res) {
    const { email, password } = req.body
    db.query(`SELECT * FROM mstuser WHERE email=? AND password=? AND isActive=1`,
        [email, password], (err, result) => {
            if (err) return res.status(500).json(err)
            if (result.length == 0)
                return res.json({ message: false })
            else
                return res.json({ message: true, user: result[0] })
        })
}

module.exports = {
    getAllUsers,
    getUserById,
    insertUser,
    updateUser,
    removeUser,
    checkUser
}