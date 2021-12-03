const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
require('dotenv').config({path : 'apis/.env'})

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempfiles: true
}))

// api routing
app.use('/user', require('./routes/userRoutes'))
app.use('/catalogue', require('./routes/catalogueRoutes'))

// db connection
const dbURI = process.env.DATABASE
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
        if(err) throw err;
        console.log('Connected to mongodb')
})

// port connection
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server running on port: ', PORT)
})