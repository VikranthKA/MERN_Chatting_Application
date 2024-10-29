const User = require("../models/user")

const userCltr = {

}

userCltr.register = async(req,res)=>{
    const {username,password} = req.body
    const createdUser = await User.create({username,password})
    jwt.sign({userId:createdUser._id}.process.env.JWT_SECRET_KEY,(err,token)=>{
        if(err) throw err;
        res.cookie('token',token).status(201).json("User created successfully")
    })



}

module.exports = userCltr