const mongoose = require('mongoose')

const PositionSchema = mongoose.Schema({
    name: {
        type: String,
        req: [true,'Give position name'],
        unique: true
    },
    info: {
        type: String,
        default: 'Description', 
    }
})

module.exports = mongoose.model('Position', PositionSchema)