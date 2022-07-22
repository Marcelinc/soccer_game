const mongoose = require('mongoose')

const statsLevelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true   
    },
    color: {
        type: String,
        default: 'blue'
    },
    maxPoints: {
        type: Number,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('StatsLevel',statsLevelSchema)