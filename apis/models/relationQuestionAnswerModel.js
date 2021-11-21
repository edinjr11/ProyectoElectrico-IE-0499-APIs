const mongoose = require('mongoose')

const relationQuestionAnswerSchema = new mongoose.Schema({
    questionId: {
        type: String,
        required: true
    },
    optionId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("relationQuestionsAnswers", relationQuestionAnswerSchema)