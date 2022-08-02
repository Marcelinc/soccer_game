const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    age: {
        type: Number,
        default: 0
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        default: '62c2c645c99bd1a51a3ac2bd'
    },
    description: {
        type: String,
        default: 'Set your description..'
    },
    
    position: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Position'
    },
    experience: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experience'
    },
    stats: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'statsModel'
    },
    statsModel: {
        type: String,
        required: true,
        enum: ['DefenderStats','MidfielderStats','StrikerStats','GoalkeeperStats','UnselectedStats']
    },
    currency: {
        money: {
            type: Number,
            default: 100
        },
        stars: {
            type: Number,
            default: 5
        }
    },
    club: {
        has: {
            type: Boolean,
            default: false
        },
        id: {
            type: mongoose.Types.ObjectId,
            ref: 'Club'
        }
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('User',userSchema)