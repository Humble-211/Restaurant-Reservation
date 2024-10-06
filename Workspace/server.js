const express = require('express')
const connectDB = require('./config/db.js')
require('dotenv').config()

const app = express()

connectDB();

app.use(express.json())

// apis
app.use(express.static('public'))

app.use('/api/users', require('./routes/userRoutes'))



//set up server
const PORT = process.env.PORT || 9191

app.listen(PORT, () => console.log(`server started on port ${PORT}`))


