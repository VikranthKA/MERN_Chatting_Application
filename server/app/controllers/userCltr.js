const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userCltr = {}

userCltr.register = async(req,res)=>{
    const {username,password} = req.body

try {
        const hashedPassword = await bcrypt.hash(password,10)

        const createdUser = await User.create({username,password:hashedPassword})

        jwt.sign({userId:createdUser._id},process.env.JWT_SECRET_KEY,(err,token)=>{
            if(err){
                console.log(err)
                return res.status(500).json({error:err, message: "Internal server error" });

            }
            return res.cookie('token',token,{httpOnly:true,secure:process.env.NODE_ENV==='production'})
            .status(201)
            .json({
                message:"User created successfully",
                username:createdUser.username,
                id:createdUser._id
            })
        })

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: "Username is already taken" });
          }
        console.log(error)
        return res.status(500).json({
            error:error,
            message:"error while registering"
        })
        
    }
}



module.exports = userCltr