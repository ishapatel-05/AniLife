const db=require("../config/db")

exports.getAll= (req,res)=>{
    // writing query
    db.query("select * from category",(err,result)=>{
        if(err)
            return res.status(500).json(err);
        return res.json(result);
    })
}