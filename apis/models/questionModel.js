const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    questionStatement: {
        type: String,
        required: true
    },
    questionnaireId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Questions", questionSchema)