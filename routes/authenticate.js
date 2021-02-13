if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./passport-config')
initializePassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

const users = []

router.use(express.urlencoded({ extended: false}))
router.use(flash())
router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
router.use(passport.initialize())
router.use(passport.session())
router.use(methodOverride('_method'))


router.use( (req,res,next) => {
    console.log(req.url, "@", Date.now())
    next()
})

router.get('/', checkAuthenticated, (req, res) => {
    res.render('authenticate', { name: req.user.name })
    // res.send("Hi from registration")
})

// router.get('/register', checkNotAuthenticated, (req, res) => {
//     res.render('authenticate/register')
//     // res.send("Hi from registration")
// })

router.get('/log-reg', checkNotAuthenticated, (req, res) => {
    res.render('authenticate/log-reg')
    // res.send("Hi from registration")
})

// Create User Route
router.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/authenticate/login')
    } catch  {
        res.redirect('/authenticate/register')
    }
    console.log(users)
})

router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('authenticate/login')
    // res.send("Hi from registration")
})

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/authenticate',
    failureRedirect: '/authenticate/login',
    failureFlash: true
}))

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/authenticate/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/authenticate')
    }
    next()
    
}

module.exports = router