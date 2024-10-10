const express = require('express')
const connectDB = require('./config/db.js')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes')   
require('dotenv').config()

const app = express()


connectDB();

//app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


// serve static files
app.use(express.static('public'))

//routes
app.use('/users', userRoutes)



// set up server
const port = 9191
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

