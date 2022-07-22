const mongoose = require('mongoose')

const unselectedSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    description: {
        type: String,
        default: 'First choose position'
    },
    level: {
        type: mongoose.Types.ObjectId,
        ref: 'StatsLevel',
        required: true
    },
})

module.exports = mongoose.model('UnselectedStats',unselectedSchema)