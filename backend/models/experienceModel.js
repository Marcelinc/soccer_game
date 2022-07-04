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
        default: "62c2aa21275da2971a380196"
    }
})

module.exports = mongoose.model('Experience',experienceSchema)