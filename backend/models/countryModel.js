const mongoose = require('mongoose')

const Countries = {
    'unselected' : 'Choose country',
    'pol' : 'Poland',
    'eng' : 'England',
    'fra' : 'France',
    'ger' : 'Germany',
    'spa' : 'Spain'
}

const countrySchema = mongoose.Schema({
    name: {
        type: String,
        //enum: Countries,
        //default: Countries.unselected
        require: [true, 'Give country name'],
        unique: true
    },
    flag: {
        path: {
            type: String
        }
    },
    bonus: {
        name: {
            type: String,
            default: 'No bonuses'
        }
    }
})

module.exports = mongoose.model('Country',countrySchema)