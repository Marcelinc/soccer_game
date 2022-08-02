const ManagerLevel = require('../models/club/manager/managerLevelModel')
const asyncHandler = require('express-async-handler')

const levels = [{name: '1', upgradeCost: {money: 1000,stars:0}},{name: '2', upgradeCost: {money: 1000,stars:0}},
{name: '3', upgradeCost: {money: 12000,stars:0}},{name: '4', upgradeCost: {money: 48000,stars:0}},
{name: '5', upgradeCost: {money: 110000,stars:0}},{name: '6', upgradeCost: {money: 180000,stars:1}},
{name: '7', upgradeCost: {money: 260000,stars:2}},{name: '8', upgradeCost: {money: 500000,stars:4}},
{name: '9', upgradeCost: {money: 750000,stars:6}},{name: '10', upgradeCost: {money: 1000000,stars:10}}]

const managerLevelSeeder = asyncHandler(async (lvls) => {
    result = await ManagerLevel.insertMany(lvls,err => console.log(err))
})

module.exports = managerLevelSeeder(levels)