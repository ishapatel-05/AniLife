const db=require("../config/db")

function getAllstate(req,res)
{
    db.query(`select c.countryname,s.statename,s.stateid from 
        country as c inner join state as s on 
        c.countryid = s.countryid where s.isActive = 1
        `,(err,result)=>
    {
        if(err)
            return res.status(500).json(err)
        return res.json(result)
    })
}

function getStateById(req,res)
{
    const {id}=req.params
    db.query(`select c.countryname,s.statename,s.stateid from 
        country as c inner join state as s on 
        c.countryid = s.countryid
        where stateid=?`,[id],(err,result)=>
    {
        if(err)
            return res.status(500).json(err)
        if(result.length==0)
            return res.json({Message:"No record found"})
        return res.json(result[0])
    })
}

function addState(req,res)
{
    const {statename,countryid}=req.body
    db.query("insert into state(statename,countryid) values(?,?)",[statename,countryid],(err,result)=>
    {
        if(err)
            return res.status(500).json(err)
        return res.json({message:"Record inserted successfully"})
    })
}

// function upstate(req,res)
// {
//     const {id}=req.params
//     const {statename}=req.body
//     db.query("Update state set statename=? where stateid=?",[statename,id],(err,result)=>
//     {
//         if(err)
//             return res.status(500).json(err)
//         return res.json({message:"Record updated successfully"})
//     })
// }

function upstate(req, res) {
    const { id } = req.params
    const { statename, countryid } = req.body

    db.query(
        "UPDATE state SET statename=?, countryid=? WHERE stateid=?",
        [statename, countryid, id],
        (err) => {
            if (err) return res.status(500).json(err)
            return res.json({ message: "State updated successfully" })
        }
    )
}
function removestate(req,res)
{
    const {id}=req.params
    db.query("update state set isActive=0 where stateid=?",[id],(err,result)=>
    {
        if(err)
            return res.status(500).json(err)
        return res.json({message:"Record deleted successfully"})
    })
}

module.exports={
    getAllstate,
    getStateById,
    addState,
    upstate,
    removestate
}