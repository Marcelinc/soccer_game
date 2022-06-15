const mongoose = require('mongoose')

const PositionStatsSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    
})

model.exports = mongoose.model('PositionStats',PositionStatsSchema)