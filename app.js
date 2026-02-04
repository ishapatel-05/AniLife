require("dotenv").config()

const express = require("express")
const cors = require("cors")
const bodyparser = require("body-parser")

const caterouter = require("./nodeAPI/routes/category.routes")


//main code

const app = express()
app.use(cors())
app.use(bodyparser.json())
app.use('/api/isha', router)


PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on $(PORT)`)
});