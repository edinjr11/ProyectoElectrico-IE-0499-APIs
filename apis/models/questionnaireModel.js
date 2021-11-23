const mongoose = require('mongoose')

const questionnaireSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    totalAmount: {
        type: Number,
        default: 0
    },
    showedAmount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Questionnaires", questionnaireSchema)