const mongoose = require('mongoose')

const clubPlayersSchema = mongoose.Schema({
    clubId: {
        type: mongoose.Types.ObjectId,
        ref: 'Club',
        required: [true,'Set club`s id']
    },
    players: {
        type: Array,
        playerId: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        positionNumb: {
            type: String,
            enum: ['1','2','3','4','5','6','7','8','9','10','11','-'],
            default: '-'
        }
    },
})

module.exports = mongoose.model('ClubPlayers',clubPlayersSchema)