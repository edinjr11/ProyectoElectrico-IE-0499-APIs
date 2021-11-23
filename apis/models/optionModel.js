const mongoose = require('mongoose')

const optionSchema = new mongoose.Schema({
    optionStatement: {
        type: String,
        required: true
    },
    questionId: {
        type: String,
        required: true
    },
    isCorrect: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Options", optionSchema)