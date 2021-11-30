const Stores = require('../models/storeModel')
const Products = require('../models/productModel')
const RelationUsersStores = require('../models/relationStoreUserModel')
const RelationProductsStores = require('../models/relationProductStoreModel')

const testController = {
    addStore: async (req, res) => {

        // Missing to add the check featuring for authAdmin
        try {
            // get variables from body request
            const {name} = req.body
            if(!name) {
                return res.status(400).json({message: 'Store name is missing'})
            }

            // check if store already exists
            const storeLookup = await Stores.findOne({name})
            if(storeLookup) {
                return res.status(400).json({message: 'This store already exists on the db'})
            }

            // create a new questionnaire and save it
            const newStore = new Stores({
                name
            })
            await newStore.save()
            res.json({message: 'New store added'})
        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    },
    getStoresUser: async (req, res) => {
        try {
            // get variables from body request
            const userId = req.user.id

            // checking if user has had registered stores
            const relationUserStoreLookup = await RelationUsersStores.find({userId})
            if(relationUserStoreLookup.length == 0) {
                res.status(400).json({message: 'User does not register any store'})
            }

            // gathering stores Ids in a array  
            const storesIds = []
            relationUserStoreLookup.forEach( (rel) => { 
                storesIds.push(rel.storeId)  
            })

            // looking for current user's stores
            const storesLookup = await Stores.find({ '_id': { $in: storesIds } }).select('_id, name, location, phone')
            const storesList = {
                data: storesLookup
            }
            res.json(storesList)
        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    },
    addQuestionnaireToUser: async (req, res) => {
        try {
            // get variables from body request
            const {userId, questionnaireId} = req.body

            // check if user exists
            const checkUser = await Users.findOne({_id: userId})
            if(!checkUser) {
                return res.status(400).json({message: 'User does not exists'})
            }

            // check if questionnarie exists
            const checkQuestionnaire = await Questionnaires.findOne({_id: questionnaireId})
            if(!checkQuestionnaire) {
                return res.status(400).json({message: 'Questionnaire does not exists'})
            }

            // check if user already has the questionnaire assigned
            const relationUserStoreLookup = await RelationUsersStores.find({userId})
            relationUserStoreLookup.forEach( (obj) => { 
                if(obj.questionnaireId == questionnaireId) {
                    return res.status(400).json({message: 'Questionnaire already assigned to user'})
                }
            })

            // create and save new user-questionnaire relation
            const newRelationUsersQuestionaires = new RelationUsersStores({
                userId,
                questionnaireId
            })
            await newRelationUsersQuestionaires.save()
            res.json({message: 'Questionnaire added to user'})
        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    },
    updateStoreInfo: async (req, res) => {
        
    }
}

module.exports = testController