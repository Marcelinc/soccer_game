const mongoose = require('mongoose')

const starring11Schema = mongoose.Schema({
    starring1: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
})

module.exports = mongoose.model('Starring11',starring11Schema)