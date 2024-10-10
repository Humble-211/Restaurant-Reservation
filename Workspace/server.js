const express = require('express')
const connectDB = require('./config/db.js')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes')   
require('dotenv').config()

const app = express()
const port = 9191

connectDB();

// Middleware to parse the body of POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files
app.use(express.static('public'))

//routes
app.use('/users', userRoutes)



// set up server

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

