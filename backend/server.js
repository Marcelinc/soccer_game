const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const cors = require('cors')
const port = process.env.PORT || 5000;

/*DB */
connectDB()
//Entry data - only once, 

//const seedLevels = require('./seeders/levelSeeder') //remember to set ID in experience model!!
//seedLevels

//const seedCountries = require('./seeders/countrySeeder') //remember to set ID in user model
//seedCountries

//const seedPosition = require('./seeders/positionSeeder')
//seedPosition

//const statLevelSeeder = require('./seeders/statsLevel')
//statLevelSeeder

/*Server*/
const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extented:false}))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/country',require('./routes/countryRoutes'))

app.use(errorHandler)

app.listen(port,() => console.log(`Server is up and running on port ${port}`))