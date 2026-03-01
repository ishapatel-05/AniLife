const db=require("../config/db")

function getAllcn(req,res)
{
    db.query("Select * from country where isActive=1",(err,result)=>
    {
        if(err)
            return res.status(500).json(err)
        return res.json(result)
    })
}

function getCnById(req,res)
{
    const {id}=req.params
    db.query("Select * from country where countryid=?",[id],(err,result)=>
    {
        if(err)
            return res.status(500).json(err)
        if(result.length==0)
            return res.json({Message:"No record found"})
        return res.json(result[0])
    })
}

function insertCn(req,res)
{
    const {countryname}=req.body
    db.query("insert into country(countryname) values(?)",[countryname],(err)=>
    {
        if(err)
            return res.status(500).json(err)
        return res.json({Message:"Record inserted successfully"})
    })
}

function updateCn(req,res)
{
    const {id}=req.params
    const {countryname}=req.body
    db.query("update country set countryname=? where countryid=?",[countryname,id],(err)=>
    {
        if(err)
            return res.status(500).json(err)
        return res.json({Message:"Record updated successfully"})
    })
}

function removeCn(req,res)
{
    const {id}=req.params
    db.query("update country set isActive=0 where countryid=?",[id],(err)=>
    {
        if(err)
            return res.status(500).json(err)
        return res.json({Message:"Record deleted successfully"})
    })
}

module.exports={
    getAllcn,
    getCnById,
    insertCn,
    updateCn,
    removeCn
}
