const mongoose = require('mongoose')

const defenderStatsSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    dribbling:{
        type: Number,
        default: 5
    },
    interceptPasses:{
        type:Number,
        default: 10
    },
    passing:{
        type: Number,
        default: 5
    },
    tackling:{
        type: Number,
        default: 10
    },
    fitness:{
        type: Number,
        default: 5
    }
})

module.exports = mongoose.model('DefenderStats',defenderStatsSchema)