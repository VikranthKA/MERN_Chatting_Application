const express = require('express')
const messagesCltr = require('../controllers/message.Cltr')
const protectRoute = require('../middlewares/auth/protectRoute')
const router = express.Router()


router.post("/send/:id",protectRoute,messagesCltr.sendMessage)



module.exports = router 