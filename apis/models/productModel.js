const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    storeId: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price : {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("products", productSchema)