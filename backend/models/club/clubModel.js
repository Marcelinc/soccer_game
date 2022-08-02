const mongoose = require('mongoose')

const clubSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true,'Name your club'],
    },
    description: {
        type: String,
        default: ''
    },
    founder: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        require: [true,'Set founder']
    },
    players: {
        type: mongoose.Types.ObjectId,
        ref: 'ClubPlayers',
        require: [true,'Set starring 11']
    },
    manager: {
        level: {
            type: mongoose.Types.ObjectId,
            ref: 'ManagerLevel',
            require: [true, 'Set manager`s level']
        }
    },
    coach: {
        level: {
            type: mongoose.Types.ObjectId,
            ref: 'CoachLevel',
            require: [true, 'Set coaches level']
        }
    }
})

module.exports = mongoose.model('Club',clubSchema)