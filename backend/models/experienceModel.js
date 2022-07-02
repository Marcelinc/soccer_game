const mongoose = require('mongoose')

const experienceSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    exp: {
        type: Number,
        default: 0
    },
    level: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Level',
        default: "62beb5e4a41c9696a6f89044"
    }
})

module.exports = mongoose.model('Experience',experienceSchema)