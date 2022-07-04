const asyncHandler = require('express-async-handler')
const Country = require('../models/countryModel')

/* 
Country = {
    name: String
}
*/

const Countries = [{name : 'Choose country'},
    {name : 'Poland'},
    {name : 'England'},
    {name : 'France'},
    {name : 'Germany'},
    {name : 'Spain'}
]

const seedCountry = asyncHandler(async seed => {
    result = await Country.insertMany(seed, err => console.log(err)) 
})

module.exports = seedCountry(Countries)