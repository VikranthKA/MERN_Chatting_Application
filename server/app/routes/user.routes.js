const express = require('express')
const protectRoute = require('../middlewares/auth/protectRoute')
const userCltr = require('../controllers/user.Cltr')
const router = express.Router()

//
router.get("/",protectRoute,userCltr.getUsersSidebar)





module.exports = router 