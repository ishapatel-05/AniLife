const db=require("../config/db")

// GET all active payment methods
function getAllPaymentMethods(req,res)
{
    db.query("Select * from paymentmethod where isActive=1",(err,result)=>
    {
        if(err)
            return res.status(500).json(err)
        return res.json(result)
    })
}

// GET payment method by ID
function getPaymentMethodById(req,res)
{
    const {id}=req.params
    db.query("Select * from paymentmethod where pmid=? AND isActive=1",[id],(err,result)=>
    {
        if(err)
            return res.status(500).json(err)
        if(result.length==0)
            return res.json({Message:"No record found"})
        return res.json(result[0])
    })
}

// POST - Insert new payment method
function insertPaymentMethod(req,res)
{
    const {paymentmethodname}=req.body
    
    if(!paymentmethodname) {
        return res.status(400).json({error: "Payment method name is required"})
    }
    
    db.query("insert into paymentmethod(paymentmethodname) values(?)",[paymentmethodname],(err)=>
    {
        if(err)
            return res.status(500).json(err)
        return res.json({message:"Record inserted successfully"})
    })
}

// PUT - Update payment method
function updatePaymentMethod(req,res)
{
    const {id}=req.params
    const {paymentmethodname}=req.body
    
    if(!paymentmethodname) {
        return res.status(400).json({error: "Payment method name is required"})
    }
    
    db.query("update paymentmethod set paymentmethodname=? where pmid=?",[paymentmethodname,id],(err)=>
    {
        if(err)
            return res.status(500).json(err)
        return res.json({message:"Record updated successfully"})
    })
}

// DELETE - Soft delete (set isActive=0)
function removePaymentMethod(req,res)
{
    const {id}=req.params
    db.query("update paymentmethod set isActive=0 where pmid=?",[id],(err)=>
    {
        if(err)
            return res.status(500).json(err)
        return res.json({message:"Record deleted successfully"})
    })
}

module.exports={
    getAllPaymentMethods,
    getPaymentMethodById,
    insertPaymentMethod,
    updatePaymentMethod,
    removePaymentMethod
}