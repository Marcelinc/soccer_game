const Country = require('../models/countryModel')
const asyncHandler = require('express-async-handler')

// @desc    Get countries
// @route   GET /country/get
// @access  Public
const getCountries = asyncHandler(async (req,res) => {
    const countries = await Country.find()

    if(countries)
        res.status(200).json({country: countries})
})

module.exports = {getCountries}