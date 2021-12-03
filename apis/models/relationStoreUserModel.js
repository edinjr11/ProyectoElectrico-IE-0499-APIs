const mongoose = require('mongoose')

const relationStoreUserSchema = new mongoose.Schema({
    storeId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("relationStoreUser", relationStoreUserSchema)