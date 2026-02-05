const db=require("../config/db")

// Get all areas with city name (INNER JOIN with city table)
function getAllarea(req,res)
{
    db.query(`select ct.cityname, a.areaname, a.pincode, a.areaid from 
        city as ct inner join area as a on 
        ct.cityid = a.cityid
        `,(err,result)=>
    {
        if(err)
            return res.status(500).json(err)
        return res.json(result)
    })
}

// Get specific area by ID with city name
function getAreaById(req,res)
{
    const {id}=req.params
    db.query(`select ct.cityname, a.areaname, a.pincode, a.areaid from 
        city as ct inner join area as a on 
        ct.cityid = a.cityid
        where areaid=?`,[id],(err,result)=>
    {
        if(err)
            return res.status(500).json(err)
        if(result.length==0)
            return res.json({Message:"No record found"})
        return res.json(result[0])
    })
}

// Insert new area with area name, pincode, and city ID
function addArea(req,res)
{
    const {areaname,pincode,cityid}=req.body
    db.query("insert into area(areaname,pincode,cityid) values(?,?,?)",[areaname,pincode,cityid],(err,result)=>
    {
        if(err)
            return res.status(500).json(err)
        return res.json({message:"Record inserted successfully"})
    })
}

// Update area name and pincode by area ID
function updateArea(req,res)
{
    const {id}=req.params
    const {areaname,pincode}=req.body
    db.query("Update area set areaname=?, pincode=? where areaid=?",[areaname,pincode,id],(err,result)=>
    {
        if(err)
            return res.status(500).json(err)
        return res.json({message:"Record updated successfully"})
    })
}

// Delete area by ID
function removeArea(req,res)
{
    const {id}=req.params
    db.query("Delete from area where areaid=?",[id],(err,result)=>
    {
        if(err)
            return res.status(500).json(err)
        return res.json({message:"Record deleted successfully"})
    })
}

module.exports={
    getAllarea,
    getAreaById,
    addArea,
    updateArea,
    removeArea
}