if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require("express")
// const morgan = require("morgan")
const app = express()
const bcrypt = require('bcrypt')
const passport =require('passport')

// const initializePassport = require('./routes/passport-config')
// initializePassport(
//     passport,
//     email => users.find(user => user.email === email)
// )

const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const favicon = require('express-favicon')
const port = 8888
// app.use(morgan('tiny'))

const indexRouter = require('./routes/index')
const authenticateRouter = require('./routes/authenticate')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(favicon('public/assets/favicon_io/favicon.ico'))


const mongoose = require('mongoose')
mongoose.connect(process.env.SECURE_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to the jetNode DB'))


// routes
app.use('/', indexRouter)
app.use('/authenticate', authenticateRouter)

app.listen(process.env.PORT || port, () => {
    console.log(`Server up on http://localhost:${port}`)
})