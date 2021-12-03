const mongoose = require('mongoose')

const storeSchema = new mongoose.Schema({
    category: {
        type: String
    },
    name: {
        type: String
    },
    location: {
        type: String
    },
    phone : {
        type: String
    },
    email: {
        type: String
    },
    hours: {
        type: String
    },
    delivery: {
        type: Boolean
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("stores", storeSchema)