const express = require('express')
const authCltr = require("../controllers/auth.Cltr")
const router = express.Router()


router.post("/signup",authCltr.signup)
router.post("/login",authCltr.login)
router.post("/logout",authCltr.logout)


module.exports = router 