const db = require("../config/db")
const upload = require("../config/multerConfig")

// GET all active profiles

function getAllProfiles(req, res) {
    const query = `
    SELECT 
      up.upid,
      up.uid,
      u.fname,
      u.lname,
      up.address,
      up.areaid,
      a.areaname,
      up.picture
    FROM userprofile up
    INNER JOIN mstuser u ON up.uid = u.uid
    INNER JOIN area a ON up.areaid = a.areaid
    WHERE up.isActive = 1
  `;

    db.query(query, (err, result) => {
        if (err) return res.status(500).json(err);
        return res.json(result);
    });
}

// module.exports = { getAllProfiles /*, other functions */ };
// function getAllProfiles(req, res) {
//     db.query(`SELECT * FROM userprofile WHERE isActive=1`,
//         (err, result) => {
//             if (err) return res.status(500).json(err)
//             return res.json(result)
//         })
// }

// GET profile by ID
function getProfileById(req, res) {
    const { id } = req.params
    db.query(`SELECT * FROM userprofile WHERE upid=? AND isActive=1`,
        [id], (err, result) => {
            if (err) return res.status(500).json(err)
            if (result.length == 0)
                return res.json({ message: "No record found" })
            return res.json(result[0])
        })
}

// GET profile by USER ID
function getProfileByUser(req, res) {
    const { uid } = req.params
    db.query(`SELECT up.*, u.fname, u.lname, a.areaname 
              FROM userprofile up
              INNER JOIN mstuser u ON up.uid = u.uid
              LEFT JOIN area a ON up.areaid = a.areaid
              WHERE up.uid=? AND up.isActive=1`,
        [uid], (err, result) => {
            if (err) return res.status(500).json(err)
            if (result.length == 0)
                return res.json({ message: "No profile found" })
            return res.json(result[0])
        })
}
// POST - Insert profile with picture
function insertProfile(req, res) {
    const { uid, address, areaid } = req.body
    const picture = req.file ? req.file.filename : null

    if (!uid || !address || !areaid) {
        return res.status(400).json({ error: "All fields are required" })
    }

    const createdon = new Date()
    const createdby = 1 // temporary fix


    db.query(`INSERT INTO userprofile 
        (uid, picture, address, areaid, createdby, createdon, isActive) 
        VALUES (?,?,?,?,?,?,1)`,
        [uid, picture, address, areaid, createdby, createdon],
        (err) => {

            if (err) return res.status(500).json(err)
            console.log("DB ERROR:", err)  // add this to see exact error
            return res.json({ message: "Profile created successfully" })
        })
}

// PUT - Update profile with picture
function updateProfile(req, res) {
    const { id } = req.params
    const { address, areaid, updatedby } = req.body
    const picture = req.file ? req.file.filename : req.body.old_picture

    const updatedon = new Date()

    db.query(`UPDATE userprofile SET picture=?, address=?, 
              areaid=?, updatedby=?, updatedon=? 
              WHERE upid=?`,
        [picture, address, areaid, updatedby, updatedon, id],
        (err) => {
            if (err) return res.status(500).json(err)
            return res.json({ message: "Profile updated successfully" })
        })
}

// DELETE - Soft delete
function removeProfile(req, res) {
    const { id } = req.params
    db.query("UPDATE userprofile SET isActive=0 WHERE upid=?", [id], (err) => {
        if (err) return res.status(500).json(err)
        return res.json({ message: "Profile deleted successfully" })
    })
}

module.exports = {
    getAllProfiles,
    getProfileById,
    getProfileByUser,
    insertProfile,
    updateProfile,
    removeProfile
}