const mongoose = require('mongoose')

const levelSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Add level name']
    },
    maxExp: {
        type: Number,
        required: [true, 'Add max exp']
    }
})

module.exports = mongoose.model('Level',levelSchema)