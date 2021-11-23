const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    optionId: {
        type: String,
    },
    questionnaireId: {
        type: String,
        required: true
    },
    questionId: {
        type: String,
        required: true
    },
    isPostponed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Answers", answerSchema)