const express = require('express')
const { createClub, getClubInfo } = require('../controllers/clubController')
const protect = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/create',protect,createClub)
router.get('/:id',protect,getClubInfo)

module.exports = router