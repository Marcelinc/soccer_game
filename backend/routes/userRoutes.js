const express = require('express')
const { getMe, registerUser, loginUser, updatePosition, updateCountry, updateAge, updateDesc } = require('../controllers/userController')
const protect = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/me',protect,getMe)
router.post('/register',registerUser)
router.post('/login',loginUser)
router.put('/position',protect, updatePosition)
router.put('/country',protect,updateCountry)
router.put('/age',protect,updateAge)
router.put('/desc',protect,updateDesc)

module.exports = router