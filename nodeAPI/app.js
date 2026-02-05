require("dotenv").config()

const express = require("express")
const cors = require("cors")
const bodyparser = require("body-parser")

const cnRoutes = require("./routes/country.routes")
const stRoutes = require("./routes/state.routes")
const cityRoutes=require("./routes/city.routes")
const areaRoutes=require("./routes/area.routes")

//main code

const app = express()
app.use(cors())
app.use(bodyparser.json())
app.use('/api/country', cnRoutes)
app.use('/api/state', stRoutes)
app.use('/api/city',cityRoutes)
app.use('/api/area',areaRoutes)



PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running on ${PORT}`))

