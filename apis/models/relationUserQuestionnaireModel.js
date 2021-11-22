const mongoose = require('mongoose')

const relationUserQuestionnaireSchema = new mongoose.Schema({
    userId: {
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

module.exports = mongoose.model("RelationUsersQuestionnaires", relationUserQuestionnaireSchema)