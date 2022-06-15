const mongoose = require('mongoose')

const Countries = {
    'unselected' : 'Choose country',
    'pol' : 'Poland',
    'eng' : 'England',
    'fra' : 'France',
    'ger' : 'Germany',
    'spa' : 'Spain'
}

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
        type: String,
        enum: Countries,
        default: Countries.unselected
    },
    description: {
        type: String,
        default: ''
    },
    position: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Position'
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('User',userSchema)