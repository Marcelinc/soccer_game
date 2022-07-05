const {Types} = require('mongoose')
const User = require('../models/userModel')
const Position = require('../models/positionModel')
const Experience = require('../models/experienceModel')
const Level = require('../models/levelModel')
const Country = require('../models/countryModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

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
        const position = await Position.create({user:_id})
        const exp = await Experience.create({userId:_id})
        const newUser = await User.create({_id,name,email,password:hashedPassword,position:position._id, experience:exp._id})
        

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
        }}).populate({path: 'country', select: 'name -_id'})
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
                    exp:user.experience
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
    const userPos = await Position.findOne({user:req.user.id})

    if(userPos){
        if(userPos.name !== 'unselected')
        {
            res.status(400)
            throw new Error("You can't select position second time")
        } else {
            if(position === 'Goalkeeper' || position === 'Defender' || position === 'Midfielder' || position === 'Striker'){
                //update user position
                userPos.name = position
                const update = await userPos.save()
                console.log('Update: ', update)
                //let update = await Position.updateOne({user: req.user.id}, {name: position})
                update.name === position ? res.status(200).json({message: `Updated position: ${position}`}) : 
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

//Generate JWT
const generateToken = (id) => jwt.sign({id},process.env.JWT_SECRET,{expiresIn: '30d'})

module.exports = {
    registerUser,
    loginUser,
    getMe,
    updatePosition,
    updateCountry
}