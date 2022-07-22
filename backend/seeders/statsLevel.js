const asyncHandler = require('express-async-handler')
const StatsLevel = require('../models/statsLevelModel')

const Levels = [{name: '1',color: 'green',maxPoints: 100},{name: '2', color: 'gold',maxPoints: 1000},{name: '3', color: 'blue',maxPoints: 10000}]

const statLevelSeeder = asyncHandler(async (levels) => {
    seed = await StatsLevel.insertMany(levels)
})

module.exports = statLevelSeeder(Levels)