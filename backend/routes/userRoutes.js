const express = require('express')
const { getMe, registerUser, loginUser, updatePosition, updateCountry } = require('../controllers/userController')
const protect = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/me',protect,getMe)
router.post('/register',registerUser)
router.post('/login',loginUser)
router.put('/position',protect, updatePosition)
router.put('/country',protect,updateCountry)

module.exports = router