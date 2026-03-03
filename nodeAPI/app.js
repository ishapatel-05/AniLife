require("dotenv").config()

const express = require("express")
const cors = require("cors")
const bodyparser = require("body-parser")

const cnRoutes = require("./routes/country.routes")
const stRoutes = require("./routes/state.routes")
const cityRoutes=require("./routes/city.routes")
const areaRoutes=require("./routes/area.routes")
const paymentMethodRoutes=require("./routes/paymentmethod.routes")
const breed=require("./routes/breed.routes")
const donationRoutes = require("./routes/donation.routes")

const ngoRoutes = require("./routes/ngosinfo.routes")
const vetRoutes = require("./routes/vetinfo.routes")
const volunteerRoutes = require("./routes/volunteer.routes")
const animalInfoRoutes = require("./routes/animalinfo.routes")

const adminRoutes = require("./routes/mstadmin.routes")
const userRoutes = require("./routes/mstuser.routes")
//for pic
const userProfileRoutes = require("./routes/userprofile.routes")
//animal category
const categoryRoutes = require("./routes/animalcategory.routes")

const petRoutes = require("./routes/petlisting.routes")
const adoptionRoutes = require("./routes/adoptionrequest.routes")
const rescueRoutes = require("./routes/rescuecase.routes")

const donationRouter = require("./routes/donation.routes")


//main code

const app = express()
app.use(cors())
app.use(bodyparser.json())


app.use('/api/country', cnRoutes)
app.use('/api/state', stRoutes)
app.use('/api/city',cityRoutes)
app.use('/api/area',areaRoutes)
app.use('/api/paymentmethod',paymentMethodRoutes)
app.use('/api/breed',breed)
app.use('/api/donation', donationRoutes)
app.use('/api/ngosinfo', ngoRoutes)
app.use('/api/vet', vetRoutes)
app.use('/api/volunteer', volunteerRoutes)
app.use('/api/animalinfo', animalInfoRoutes)

app.use('/api/admin', adminRoutes)
app.use('/api/user', userRoutes)
//for pic
app.use('/uploads', express.static('uploads')) // ← serve images
app.use('/api/userprofile', userProfileRoutes)

//animal category
app.use('/api/category', categoryRoutes)

app.use('/api/petlisting', petRoutes)

app.use('/api/adoption', adoptionRoutes)
app.use('/api/rescuecase', rescueRoutes)
app.use('/api/donation', donationRouter)




PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running on ${PORT}`))

