const Questionnaires = require('../models/questionnaireModel')
const Users = require('../models/userModel')
const RelationUsersQuestionnaires = require('../models/relationUserQuestionnaireModel')

const testController = {
    addQuestionnaires: async (req, res) => {
        try {
            const {name, totalAmount, showedAmount} = req.body
            if(!name) {
                return res.status(400).json({message: 'A questionnaire name must be provided'})
            }

            const checkQuestionnaire = await Questionnaires.findOne({name})
            if(checkQuestionnaire) {
                return res.status(400).json({message: 'Questionnaire already exists'})
            }

            const newQuestionnaire = new Questionnaires({
                name,
                totalAmount,
                showedAmount
            })
            await newQuestionnaire.save()
            res.json({message: 'New questionnaire added'})
        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    },
    
    getQuestionnaires: async (req, res) => {
        try {
            const userId = req.user.id
            const checkRelationUserQuestionnaire = await RelationUsersQuestionnaires.find({userId})
            if(checkRelationUserQuestionnaire.length == 0) {
                res.status(400).json({message: 'User does not have questionnaires assigned'})
            }

            const questionnairesIds = []
            checkRelationUserQuestionnaire.forEach( (obj) => { 
                questionnairesIds.push(obj.questionnaireId)  
            })
            const records = await Questionnaires.find({ '_id': { $in: questionnairesIds } }).select('_id, name')
            console.log(records)
            res.json({message: 'Questionnaires displayed'})
        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    },
    addQuestionnaireToUser: async (req, res) => {
        try {
            const {userId, questionnaireId} = req.body
            const checkUser = await Users.findOne({_id: userId})
            if(!checkUser) {
                return res.status(400).json({message: 'User does not exists'})
            }

            const checkQuestionnaire = await Questionnaires.findOne({_id: questionnaireId})
            if(!checkQuestionnaire) {
                return res.status(400).json({message: 'Questionnaire does not exists'})
            }

            const checkRelationUserQuestionnaire = await RelationUsersQuestionnaires.find({userId})
            checkRelationUserQuestionnaire.forEach( (obj) => { 
                if(obj.questionnaireId == questionnaireId) {
                    return res.status(400).json({message: 'Questionnaire already assigned to user'})
                }
            })

            const newRelationUsersQuestionaires = new RelationUsersQuestionnaires({
                userId,
                questionnaireId
            })
            await newRelationUsersQuestionaires.save()
            res.json({message: 'Questionnaire added to user'})
        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    }
}

module.exports = testController