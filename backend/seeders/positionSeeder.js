const Position = require('../models/positionModel')
const asyncHandler = require('express-async-handler')

const Positions = [
    {name: 'Goalkeeper'},
    {name : 'Defender'},
    {name : 'Midfielder'},
    {name : 'Striker'},
    {name: 'unselected'}
]

const seedPosition = asyncHandler(async (positions) => {
    result = await Position.insertMany(positions, err => console.log(err))
})

module.exports = seedPosition(Positions)