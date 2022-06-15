const mongoose = require('mongoose')

const goalkeeperStatsSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    passing:{
        type: Number,
        default: 5
    },
    defenceCloseRange:{
        type: Number,
        default: 10
    },
    defenceHeadShot:{
        type: Number,
        default: 10
    },
    defenceLongRange:{
        type: Number,
        default: 10
    },
    fitness:{
        type: Number,
        default: 5
    }
})

module.exports = mongoose.model('GoalkeeperStats',goalkeeperStatsSchema)