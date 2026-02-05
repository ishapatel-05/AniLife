require("dotenv").config()

const express = require("express")
const cors = require("cors")
const bodyparser = require("body-parser")

const cnRoutes = require("./routes/country.routes")


//main code

const app = express()
app.use(cors())
app.use(bodyparser.json())
app.use('/api/country', cnRoutes)


PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running on ${PORT}`))


/*require("dotenv").config()
const express=require("express")
const cors=require("cors")
const bodyparser=require("body-parser")
const cnRoutes=require("./routes/country.routes")
const stRoutes=require("./routes/state2.routes")

const app=express()

app.use(cors())
app.use(bodyparser.json())

app.use('/api/country',cnRoutes)
app.use('/api/state2',stRoutes)

PORT=process.env.PORT||5000
app.listen(PORT,()=>console.log(`Server is running on ${PORT}`))
*/ 
