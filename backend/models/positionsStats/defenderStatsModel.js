const mongoose = require('mongoose')

const defenderStatsSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        require: [true, 'Ref to user'],
        unique: true
    },
    level: {
        type: mongoose.Types.ObjectId,
        ref: 'StatsLevel',
        required: true
    },
    stat1:{
        name: {
            type:String,
            default: 'Dribbling'
        },
        value: {
            type: Number,
            default: 5
        }
    },
    stat2:{
        name: {
            type: String,
            default: 'InterceptPasses'
        },
        value: {
            type:Number,
            default: 10
        }
    },
    stat3:{
        name: {
            type: String,
            default: 'Passing'
        },
        value: {
            type: Number,
            default: 5
        }
    },
    stat4:{
        name: {
            type: String,
            default: 'Tackling'
        },
        value: {
            type: Number,
            default: 10
        }
    },
    stat5:{
        name: {
            type: String,
            default: 'Fitness'
        },
        value: {
            type: Number,
            default: 5
        }
    }
})

module.exports = mongoose.model('DefenderStats',defenderStatsSchema)