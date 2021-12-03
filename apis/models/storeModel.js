const mongoose = require('mongoose')

const storeSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    phone : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hours: {
        type: String,
        required: true
    },
    delivery: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("stores", storeSchema)