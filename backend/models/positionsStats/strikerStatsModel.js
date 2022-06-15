const mongoose = require('mongoose')

const strikerStatsSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    dribbling:{
        type: Number,
        default: 5
    },
    goalShot: {
        type: Number,
        default: 10
    },
    passing:{
        type: Number,
        default: 5
    },
    sprint:{
        type: Number,
        default: 10
    },
    fitness:{
        type: Number,
        default: 5
    }
})

module.exports = mongoose.model('StrikerStats',strikerStatsSchema)