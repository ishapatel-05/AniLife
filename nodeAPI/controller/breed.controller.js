const db=require("../config/db")

// GET all active breeds with category name (INNER JOIN)
function getAllBreeds(req,res)
{
    db.query(`
        select b.breedid, b.breedname, b.catid, cat.catname 
        from animalcategory as cat 
        inner join breed as b on cat.catid = b.catid 
        where b.isActive = 1
    `,(err,result)=>
    {
        if(err)
            return res.status(500).json(err)
        return res.json(result)
    })
}
// function getAllBreeds(req,res)
// {
//     db.query(`select cat.catname, b.breedname, b.breedid from 
//         animalcategory as cat inner join breed as b on 
//         cat.catid = b.catid 
//         where b.isActive = 1
//         `,(err,result)=>
//     {
//         if(err)
//             return res.status(500).json(err)
//         return res.json(result)
//     })
// }

// GET breed by ID with category name
function getBreedById(req,res)
{
    const {id}=req.params
    db.query(`select cat.catname, b.breedname, b.breedid from 
        animalcategory as cat inner join breed as b on 
        cat.catid = b.catid 
        where b.breedid = ? AND b.isActive = 1
        `,[id],(err,result)=>
    {
        if(err)
            return res.status(500).json(err)
        if(result.length==0)
            return res.json({Message:"No record found"})
        return res.json(result[0])
    })
}

// POST - Insert new breed
function insertBreed(req,res)
{
    const {breedname, catid}=req.body
    
    if(!breedname || !catid) {
        return res.status(400).json({error: "Breed name and category ID are required"})
    }
    
    db.query("insert into breed(breedname, catid) values(?,?)",[breedname, catid],(err)=>
    {
        if(err)
            return res.status(500).json(err)
        return res.json({message:"Record inserted successfully"})
    })
}

// PUT - Update breed
function updateBreed(req,res)
{
    const {id}=req.params
    const {breedname, catid}=req.body
    
    if(!breedname || !catid) {
        return res.status(400).json({error: "Breed name and category ID are required"})
    }
    
    db.query(
        "update breed set breedname=?, catid=? where breedid=?",
        [breedname, catid, id],
        (err)=>
        {
            if(err)
                return res.status(500).json(err)
            return res.json({message:"Record updated successfully"})
        }
    )
}
// function updateBreed(req,res)
// {
//     const {id}=req.params
//     const {breedname}=req.body
    
//     if(!breedname) {
//         return res.status(400).json({error: "Breed name is required"})
//     }
    
//     db.query("update breed set breedname=? where breedid=?",[breedname,id],(err)=>
//     {
//         if(err)
//             return res.status(500).json(err)
//         return res.json({message:"Record updated successfully"})
//     })
// }

// DELETE - Soft delete (set isActive=0)
function removeBreed(req,res)
{
    const {id}=req.params
    db.query("update breed set isActive=0 where breedid=?",[id],(err)=>
    {
        if(err)
            return res.status(500).json(err)
        return res.json({message:"Record deleted successfully"})
    })
}

module.exports={
    getAllBreeds,
    getBreedById,
    insertBreed,
    updateBreed,
    removeBreed
}