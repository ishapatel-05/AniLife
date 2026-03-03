const db = require("../config/db")

// GET all active categories
function getAllCategories(req, res) {
    db.query(`SELECT * FROM animalcategory WHERE isActive=1`,
        (err, result) => {
            if (err) return res.status(500).json(err)
            return res.json(result)
        })
}

// GET category by ID
function getCategoryById(req, res) {
    const { id } = req.params
    db.query(`SELECT * FROM animalcategory WHERE catid=? AND isActive=1`,
        [id], (err, result) => {
            if (err) return res.status(500).json(err)
            if (result.length == 0)
                return res.json({ message: "No record found" })
            return res.json(result[0])
        })
}

// POST - Insert category with image
// function insertCategory(req, res) {
//     const { catname, createdby } = req.body
//     const categorypic = req.file ? req.file.filename : null

//     if (!catname) {
//         return res.status(400).json({ error: "Category name is required" })
//     }

//     const createdon = new Date()

//     db.query(`INSERT INTO animalcategory 
//         (catname, categorypic, createdby, createdon, isActive) 
//         VALUES (?,?,?,?,1)`,
//         [catname, categorypic, createdby, createdon],
//         (err) => {
//             if (err) return res.status(500).json(err)
//             return res.json({ message: "Category inserted successfully" })
//         })
// }

// PUT - Update category with image

function insertCategory(req, res) {
    const { catname } = req.body
    const categorypic = req.file ? req.file.filename : null

    if (!catname) {
        return res.status(400).json({ error: "Category name is required" })
    }

    const createdby = 1   // ✅ temporary fix
    const createdon = new Date()

    db.query(`INSERT INTO animalcategory 
        (catname, categorypic, createdby, createdon, isActive) 
        VALUES (?,?,?,?,1)`,
        [catname, categorypic, createdby, createdon],
        (err) => {
            if (err) {
                console.log("DB ERROR:", err)   // 🔥 add this
                return res.status(500).json(err)
            }
            return res.json({ message: "Category inserted successfully" })
        })
}

function updateCategory(req, res) {
    const { id } = req.params
    const { catname, updatedby } = req.body
    const categorypic = req.file ? req.file.filename : req.body.old_picture

    const updatedon = new Date()

    db.query(`UPDATE animalcategory SET catname=?, categorypic=?, 
              updatedby=?, updatedon=? WHERE catid=?`,
        [catname, categorypic, updatedby, updatedon, id],
        (err) => {
            if (err) return res.status(500).json(err)
            return res.json({ message: "Category updated successfully" })
        })
}

// DELETE - Soft delete
function removeCategory(req, res) {
    const { id } = req.params
    db.query("UPDATE animalcategory SET isActive=0 WHERE catid=?", [id], (err) => {
        if (err) return res.status(500).json(err)
        return res.json({ message: "Category deleted successfully" })
    })
}

module.exports = {
    getAllCategories,
    getCategoryById,
    insertCategory,
    updateCategory,
    removeCategory
}