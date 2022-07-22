const {Types} = require('mongoose')
const User = require('../models/userModel')
const Position = require('../models/positionModel')
const Experience = require('../models/experienceModel')
const Level = require('../models/levelModel')
const Country = require('../models/countryModel')
const GoalkeeperStats = require('../models/positionsStats/goalkeeperStatsModel')
const MidfielderStats = require('../models/positionsStats/midfielderStatsModel')
const DefenderStats = require('../models/positionsStats/defenderStatsModel')
const StrikerStats = require('../models/positionsStats/strikerStatsModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const UnselectedStats = require('../models/positionsStats/unselectedStatsModel')
const StatsLevel = require('../models/statsLevelModel')

// @desc    Register an user 
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req,res) => {
    const {name,email,password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    try {
        //Check if user exists
        const user = await User.findOne({email})
        if(user){
            res.status(400)
            return Promise.reject('User exists');
        }

        //Generate an id
        const _id = new Types.ObjectId()
        
        //Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        
        //Create position and user with experience
        const position = await Position.findOne({name:'unselected'})
        const exp = await Experience.create({userId:_id})
        const statsLevel = await StatsLevel.findOne({name: '1'}) 
        const stats = await UnselectedStats.create({userId:_id, level:statsLevel._id})
        //console.log(stats)
        const newUser = await User.create({_id,name,email,password:hashedPassword,position:position._id, experience:exp._id, 
            stats:stats._id,statsModel:'UnselectedStats'})
        

        if(newUser && position){
            res.status(201).json({
                message: 'Success',
                data:{
                    _id: newUser.id,
                    name: newUser.name,
                    pos: position.name,
                    token: generateToken(newUser.id)
                }
            })
        } else {
            res.status(400)
            return Promise.reject('Invalid user data');
        }
    } catch (error) {
        console.log(error)
        res.json({message:error})
    }
})

// @desc    Authenticate an user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body

    //Check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
        message: 'Success',
        data: {
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        }
        })
    } else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe =asyncHandler(async (req,res) => {
    try {
        const user = await User.findById(req.user.id).populate('position').populate({path: 'experience', select: 'exp level -_id', populate: {
            path: 'level', select: 'name maxExp -_id' 
        }}).populate({path: 'country', select: 'name -_id'}).populate({path: 'stats', select: '-userId', populate: {
            path: 'level',
        }})
        //const position = await Position.findOne({user: req.user.id})
        if(!user){
            res.status(400)
            throw new Error('User not exist')
        } else {
            res.status(200).json({message: 'Success', data: {
                user: {
                    id:user._id,
                    name:user.name,
                    email:user.email,
                    age:user.age,
                    country:user.country,
                    desc:user.description,
                    exp:user.experience,
                    stats:user.stats,
                    statsModel:user.statsModel,
                    currency: {
                        money: user.currency.money,
                        stars: user.currency.stars
                    }
                },
                pos:user.position.name}
            })
        }


    } catch (error) {
        res.status(500)
        throw new Error('Problem with DB connection '+error)
    }
})

// @desc    Update user position
// @route   PUT /api/users/position
// @access  Private
const updatePosition = asyncHandler(async (req,res) => {
    const {position} = req.body
    const user = await User.findOne({_id:req.user.id}).populate('position')

    if(user){
        if(user.position.name !== 'unselected')
        {
            res.status(400)
            throw new Error("You can't select position second time")
        } else {
            if(position === 'Goalkeeper' || position === 'Defender' || position === 'Midfielder' || position === 'Striker'){
                //update user position
                var stats,newPosition,statsLevel;
                newPosition = await Position.findOne({name: position})
                statsLevel = await StatsLevel.findOne({name: '1'})
                if(!statsLevel)
                    throw new Error('Server problem (statsLevel)')

                switch(position){
                    case 'Goalkeeper': 
                        stats = await GoalkeeperStats.create({userId:user._id,level:statsLevel._id}).then(data => user.stats=data._id);
                        break;
    
                    case 'Defender':
                        stats = await DefenderStats.create({userId:user._id,level:statsLevel._id}).then(data => user.stats=data._id);
                        break;

                    case 'Midfielder':
                        stats = await MidfielderStats.create({userId:user._id,level:statsLevel._id}).then(data => user.stats=data._id);
                        break;

                    case 'Striker':
                        stats = await StrikerStats.create({userId:user._id,level:statsLevel._id}).then(data => user.stats=data._id);
                        break;
                    }
                //user.stats = stats._id;
                user.statsModel = position+'Stats'
                user.position = new Types.ObjectId(newPosition._id);
                
                const update = await user.save()
                if(update)
                    oldPositionStats = await UnselectedStats.deleteOne({userId: req.user.id}) 
                //let update = await Position.updateOne({user: req.user.id}, {name: position})
                update.position.equals(newPosition._id) ? res.status(200).json({message: `Updated position: ${position}`, status:'Successfully', data: {
                    statsModel: user.statsModel, position: position, stat: stats.populate()
                }}) : 
                    res.status(500).json({message: 'The problem has occured while changing position'})
                
            } else {
                res.status(400)
                throw new Error('Incorrect position')
            }
            
        }
    } else{
        res.status(400).json({message:'User not found'})
    }
})


// @desc    Update user country
// @route   PUT /api/users/country
// @access  Private
const updateCountry = asyncHandler(async (req,res) => {
    const {country} = req.body

    if(!country)
        res.status(400).json('Bad request')

    const countryID = await Country.findOne({name:country})

    if(!countryID)
        res.status(404).json('Country not defined')
    
    const user = await User.findById(req.user.id)
    if(!user)
        res.status(404).json('User not found')
    
    user.country = countryID._id
    const updateUser = await user.save()
    if(!updateUser)
        res.status(500).json('Problem with updating user')

    res.status(200).json('User updated')
})


// @desc    Update user's age
// @route   PUT /api/users/age
// @access  Private
const updateAge = asyncHandler(async (req,res) => {
    const {age} = req.body

    if(!age)
        res.status(400).json('Bad request')
    
    const user = await User.findById(req.user.id)
    if(!user)
        res.status(401).json('Not authorized')

    user.age = age
    const update = await user.save()

    if(!update)
        res.status(500).json('Problem with updating user')

    res.status(200).json('User updated')
})


// @desc    Update user's description
// @route   PUT /api/users/desc
// @access  Private
const updateDesc = asyncHandler(async (req,res) => {
    const {description} = req.body

    if(!description)
        res.status(400).json('Bad request')

    const user = await User.findById(req.user.id)
    if(!user)
        res.status(401).json('Not authorized')

    user.description = description
    const update = await user.save()

    if(!update)
        res.status(500).json('Problem with updating user')

    res.status(200).json('User updated')
})


//Generate JWT
const generateToken = (id) => jwt.sign({id},process.env.JWT_SECRET,{expiresIn: '30d'})

module.exports = {
    registerUser,
    loginUser,
    getMe,
    updatePosition,
    updateCountry,
    updateAge,
    updateDesc
}