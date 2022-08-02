const mongoose = require('mongoose')

const managerLevelSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,'Give level name'],
        unique: true
    },
    bonus: {
        type: Number,
        default: 0
    },
    upgradeCost: {
        money: {
            type: Number,
            required: [true,'Set upgrade cost']
        },
        stars: {
            type: Number,
            required: [true, 'Set upgrade cost']
        }
    }
})

module.exports = mongoose.model('ManagerLevel',managerLevelSchema)