const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const Reservation = require('../models/Reservation')

// USER AUTH
//register new user
const registerUser = async (req,res) => {
    const {name, email, password} = req.body

    try {
        //check if email exists
        let user = await User.findOne({email})
        if (user) {
            return res.status(400).json({msg: 'user already exists'})
        }

        //encrypt password
        const salt = await bcrypt.genSalt(10)
        user = new User({
            name,
            email,
            password: await bcrypt.hash(password, salt),
        })

        //save user to db and return jwt
        await user.save()
        res.status(201).json({msg: `${user.name} created successfully, password is: ${user.password}, email is: ${user.email}`})
        const payload = {user: {id: user.id}}

        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'}, (err, token) => {
            if (err) throw err
            res.json({token})
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
}


//log in (exist user), return a jwt token
const loginUser = async (req,res) => {
    const {email, password} = req.body

    try {
        //check if user exist
        const user=await User.findOne({email})

        if (!user) {
            return res.status(400).json({msg: 'Invalid credentials'})
        }

        //compare pw vs hashed pw in database
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({msg: 'invalid credentials'})
        }
        else {
            //res.json({msg: 'logged in successfully, returning jwt'})
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h'})

            res.json({msg: `token is: ${token}`})

        } 
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }

}

// MANAGE RESERVATIONS

const makeRes = async(req,res) => {
    try {
        // get authed userId from req.user
        const userId = req.user
        //find name = userId
        const currentUser = await User.findById(userId)
        const {date, time, size} = req.body

        //make sure date time size are valid
        if (!date || !time || !size) 
            return res.status(400).json({msg:'missing info'})

        // need to add check if time is available
        // will do later

        // put them all to an object
        const reservation = new Reservation({
            name: currentUser.name,
            userId,
            date,
            time,
            size
        })

        try {
            await reservation.save()
        } catch (err) {
            console.log(err)
            console.log('userController.js makeRes func')
        }
        



        res.status(201).json({msg : 'Res is made'})
    }
    catch (err) {
        console.error('userController.js makeRes function')
        res.status(500).send('Server error')
    }
}
/*
exports.getAllRes = async(req,res) => {}


exports.modifyRes = async(req,res) => {}

exports.cancelRes = async(req,res) => {}

    */

module.exports = {registerUser,loginUser, makeRes}