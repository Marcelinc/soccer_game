const Goal = require('../models/goalModel')
const User = require('../models/userModel')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = (req,res) => {
    Goal.find({user: req.user.id}).exec()
    .then(goals => res.status(200).json({message: `Goals: ${goals}`}))
    .catch(err => res.status(500).json({message:`There is a problem with getting goals: ${err}`}))
}

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = (req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = new Goal({
        text: req.body.text,
        user: req.user.id
    })
    goal.save()
    .then(data => res.status(200).json({message:`Set goal ${data}`}))
    .catch(err => res.status(500).json({message:`The problem with adding new goal: ${err}`}))
}

// @desc    UPDATE goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = (req,res) => {
    Goal.findById(req.params.id)
    .then(goal => {
        if(!goal) throw new Error('Goal not found')
        User.findById(req.user.id)
        .then(user => {
            //check for the user
            if(!user){
                res.status(401)
                throw new Error('User not found')
            }
            //make sure the logged in user matches the goal user
            if(goal.user.toString() !== user.id){
                res.status(401)
                throw new Error('User not authorized')
            }

            Goal.findByIdAndUpdate(req.params.id,req.body,{new: true})
            .then(data => res.status(200).json({message:`Goal has been updated: ${data}`}))
            .catch(err => res.status(400).json({message:`Problem with updating: ${err}`})) 
        })
    })
    .catch(err => res.status(500).json({message:`The problem has occured: ${err}`}))
}

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = (req,res) => {
    Goal.findById(req.params.id)
    .then(goal => {
        if(!goal) throw new Error('Goal not found')
        User.findById(req.user.id)
        .then(user => {
            //check for the user
            if(!user){
                res.status(401)
                throw new Error('User not found')
            }
            //make sure the logged in user matches the goal user
            if(goal.user.toString() !== user.id){
                res.status(401)
                throw new Error('User not authorized')
            }

            Goal.deleteOne({_id: req.params.id })
            .then(data => res.status(200).json({message:`Goal has been deleted: ${data}`}))
            .catch(err => res.status(400).json({message:`Problem with deleting: ${err}`}))
        }) 
    })
    .catch(err => res.status(500).json({message:`The problem has occured: ${err}`}))
}

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}