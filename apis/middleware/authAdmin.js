const jwt = require('jsonwebtoken')

const authAdmin = (req, res, next) => {
    try {
        const token = req.header('Authorization')
        if(!token) {
            return res.status(400).json({message: 'Invalid authentication'})
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) {
                return res.status(400).json({message: 'Invalid authentication'})
            }

            if(user.role !== 1) {
                return res.status(500).json({message: "Admin rights denied"})
            }

            req.user = user
            next()
        })
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
}

module.exports = authAdmin