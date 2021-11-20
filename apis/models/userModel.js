const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter your name"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Enter your email"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Enter your password"],
    },
    role: {
        type: Number,
        default: 0 // 0 = user, 1 = admin
    },
    avatar: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDtImJarcFk6oi-TFESaVPbmkcxyuQHF-COjowE4d686oVu8y54kJnkq6KmTBWbOCOCpI&usqp=CAU"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Users", userSchema)