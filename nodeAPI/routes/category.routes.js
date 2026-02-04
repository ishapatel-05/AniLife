const express  = require("express")
const routes = express.Router()

const catecontroller = require("../controller/category.controller");

//define end points
routes.get('/',catecontroller.getAll);


module.exports= router






