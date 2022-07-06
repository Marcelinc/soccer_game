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
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('User',userSchema)