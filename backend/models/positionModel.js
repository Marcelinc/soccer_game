const mongoose = require('mongoose')

const Positions = {
    'goalkeeper' : 'Goalkeeper',
    'defender' : 'Defender',
    'midfielder' : 'Midfielder',
    'striker' : 'Striker',
    'unselected': 'unselected'
}

const PositionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        enum: Positions,
        default: Positions.unselected
    },
    fitness: {
        type: Number,
        default: 5
    },
    //stats: {
    //    type: mongoose.Schema.Types.ObjectId,
    //    default: 'unselected'
    //},
})

module.exports = mongoose.model('Position', PositionSchema)