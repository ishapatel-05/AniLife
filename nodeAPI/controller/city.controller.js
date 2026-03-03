const db=require("../config/db")

function getAllcity(req,res)
{
    db.query(`select s.statename, ct.cityname, ct.cityid from 
        state as s inner join city as ct on 
        s.stateid = ct.stateid where ct.isActive = 1
        `,(err,result)=>
    {
        if(err)
            return res.status(500).json(err)
        return res.json(result)
    })
}

function getCityById(req,res)
{
    const {id}=req.params
    db.query(`select s.statename, ct.cityname, ct.cityid from 
        state as s inner join city as ct on 
        s.stateid = ct.stateid
        where cityid=?`,[id],(err,result)=>
    {
        if(err)
            return res.status(500).json(err)
        if(result.length==0)
            return res.json({Message:"No record found"})
        return res.json(result[0])
    })
}

function addCity(req,res)
{
    const {cityname,stateid}=req.body
    db.query("insert into city(cityname,stateid) values(?,?)",[cityname,stateid],(err,result)=>
    {
        if(err)
            return res.status(500).json(err)
        return res.json({message:"Record inserted successfully"})
    })
}

// function updateCity(req,res)
function updateCity(req,res)
{
    const {id} = req.params
    const {cityname, stateid} = req.body

    db.query(
        "UPDATE city SET cityname=?, stateid=? WHERE cityid=?",
        [cityname, stateid, id],
        (err,result)=>
        {
            if(err)
                return res.status(500).json(err)

            return res.json({message:"Record updated successfully"})
        }
    )
}
// {
//     const {id}=req.params
//     const {cityname}=req.body
//     db.query("Update city set cityname=? where cityid=?",[cityname,id],(err,result)=>
//     {
//         if(err)
//             return res.status(500).json(err)
//         return res.json({message:"Record updated successfully"})
//     })
// }

function removeCity(req,res)
{
    const {id}=req.params
    db.query("update city set isActive=0 where cityid=?",[id],(err,result)=>
    {
        if(err)
            return res.status(500).json(err)
        return res.json({message:"Record deleted successfully"})
    })
}

module.exports={
    getAllcity,
    getCityById,
    addCity,
    updateCity,
    removeCity
}