const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')

const userController = {
    register: async (req, res) => {
        try {
            const {name, email, password} = req.body
            if(!name || !email || !password) {
                return res.status(400).json({message: 'Fill in all the fields'})
            }

            if(!validateEmail(email)) {
                return res.status(400).json({message: 'Invalid email format'})
            }

            const user = await Users.findOne({email})
            if(user) {
                return res.status(400).json({message: 'Email already exists'})
            }

            if(password.length < 6) {
                return res.status(400).json({message: 'Password must be at least 6 characters'})
            }

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = {
                name, 
                email, 
                password: passwordHash,
            }

            const activation_token = createActivationToken(newUser)
            const url = `http://localhost:3000/user/activate/${activation_token}`
            sendMail(email, url, "Verify email address")

            res.json({message: "Registration success. Activate your account accessing your email."})
        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    },
    activateEmail: async (req, res) => {
        try {
            const {activation_token} =req.body
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)
            const {name, email, password} = user
            const check = await Users.findOne({email})
            if(check) {
                return res.status(400).json({message: 'Email already exists'})
            }

            const newUser = new Users({
                name, 
                email,
                password
            })

            await newUser.save()
            res.json({message: 'Account has been activated'})
        } catch(err) {
            return res.status(500).json({message: err.message})
        }
    },
    login: async (req, res) => {
        try {
            const {email, password} = req.body
            const user = await Users.findOne({email})
            if(!user) {
                return res.status(400).json({message: 'Email does not exists'})
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) {
                return res.status(400).json({message: 'Password does not match with email'})
            }
            const refresh_token = createRefreshToken({id: user._id, name: user.name, email: user.email, role: user.role})
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7 days
            })
            res.json({message: "Login success"})
        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    },
    getAccessToken: (req, res) => {
        try {
            const refresh_token = req.cookies.refreshtoken
            if(!refresh_token) {
                return res.status(400).json({message: 'Login now'})
            }

            jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) {
                    return res.status(400).json({message: 'Login now'})
                }

                const access_token = createAccessToken({id: user.id, name: user.name, email: user.email, role: user.role})
                res.json({access_token})
            })
        } catch(err) {
            return res.status(500).json({message: err.message})
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const {email} = req.body
            const user = await Users.findOne({email})
            if(!user) {
                return res.status(400).json({message: 'Email does not exists'})
            }

            const access_token = createAccessToken({id: user._id, name: user.name, email: user.email, role: user.role})
            const url = `http://localhost:3000/user/reset/${access_token}`
            sendMail(email, url, 'Reset your password')
            res.json({message: 'Reset password, check your email'})
        } catch(err) {
            return res.status(500).json({message: err.message})
        }
    }, 
    resetPassword: async (req, res) => {
        try {
            const {password} = req.body
            const passwordHash = await bcrypt.hash(password, 12)
            await Users.findOneAndUpdate({_id: req.user.id}, {
                password: passwordHash
            })
            res.json({message: 'Password changed'})
        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    },
    getUserInfo: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')
            res.json({user})
        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    },
    getUsersAllInfo: async (req, res) => {
        try {
            const users = await Users.find().select('-password')
            res.json(users)
        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
            return res.json({message: 'Logged out'})
        } catch (error) {
            return res.status(500).json({message: err.message})
        }
    }
}

// email validation
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// Activation token
const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '10m'})
}

// refresh token
const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

// access token
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = userController