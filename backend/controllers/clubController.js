const Club = require('../models/club/clubModel')
const asyncHandler = require('express-async-handler')
const ManagerLevel = require('../models/club/manager/managerLevelModel')
const CoachLevel = require('../models/club/coach/coachLevelModel')
const { Types } = require('mongoose')
const ClubPlayers = require('../models/club/clubPlayersModel')
const User = require('../models/userModel')


// @desc    Create club
// @route   POST
// @access  Private
const createClub = asyncHandler(async (req,res) => {

    //Check if user is in club
    user = await User.findById(req.user.id)
    if(user.club.has){
        res.status(400)
        throw new Error('User is already in club')   
    }

    const {name} = req.body
    if(!(typeof name === 'string' || name instanceof String) && name !== '')
        res.status(400).json({message: 'Incorrect data has been sent: '+name})
    
    //Find manager and coach min. level
    manager = await ManagerLevel.findOne({name:'1'})
    coach = await CoachLevel.findOne({name:'1'})
    if(!manager || !coach)
        res.status(500).json('Server problem')

    //Create club id
    const id = new Types.ObjectId()

    //create players document
    clubPlayers = await ClubPlayers.create({clubId:id, players: [{playerId: req.user.id, positionNumb: '-'}]})
    if(!clubPlayers)
        res.status(500).json('Server problem')

    //Create club
    newClub = await Club.create({_id: id,name,founder:req.user.id,players:clubPlayers._id,manager:{level:manager._id},coach:{level:coach._id}})
    user.club.has = true
    user.club.id = newClub._id
    user.save()
    
    res.status(200).json({message:'Club created',data: {
        name: newClub.name,
        players: clubPlayers
    }})

})

// @desc    Get club info
// @route   GET
// @access  Private
const getClubInfo = asyncHandler(async (req,res) => {
    const id = req.params.id

    var club = await Club.findById(id).populate({path: 'founder', select: 'name'}).populate({path: 'players', select: 'players -_id', 
        populate: {path: 'players', populate: {path: 'playerId', model: 'User', select: 'name'}}}).populate({path: 'manager', populate: {
            path: 'level'}}).populate({path: 'coach', populate: {path: 'level'}})
    if(!club){
        res.status(500)
        throw new Error('Club not found')
    }

    console.log(club)
    res.status(200).json({data: {
        name: club.name,
        founder: club.founder,
        players: club.players,
        description: club.description,
        manager: club.manager,
        coach: club.coach
    }})
})

module.exports = {
    createClub,
    getClubInfo
}