const express = require('express')
const { getMe, registerUser, loginUser, updatePosition } = require('../controllers/userController')
const protect = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/me',protect,getMe)
router.post('/register',registerUser)
router.post('/login',loginUser)
router.put('/position',protect, updatePosition)

module.exports = router