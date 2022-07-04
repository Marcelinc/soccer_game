const asyncHandler = require('express-async-handler')
const Level = require('./../models/levelModel')

/*
Level = {
    name: String,
    maxExp: Number
}
*/ 
const seed = Array({name: '1',maxExp: 10},{name: '2', maxExp: 21});
for(i=2;i<51;i++){
    seed[i] = {name: ''+(i+1),maxExp: Math.round((1.1)*seed[i-1].maxExp+seed[i-1].maxExp)}
}
const seed1 = [{name: '1', maxExp: 0},{name: '2', maxExp: 0},{name: '3', maxExp: 0},{name: '4', maxExp: 0},{name: '5', maxExp: 0},
{name: '6', maxExp: 0},{name: '7', maxExp: 0},{name: '8', maxExp: 0},{name: '9', maxExp: 0},{name: '10', maxExp: 0},{name: '11', maxExp: 0},
,{name: '6', maxExp: 0}]

const seedLevel = asyncHandler(async (seed) => {
    result = await Level.insertMany(seed, function(err){
        console.log(err)
    })

    console.log(result)
})

module.exports = seedLevel(seed)