const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userCltr = {}



userCltr.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const foundUser = await User.findOne({ username });
        if (!foundUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const isVerifiedUser = bcrypt.compareSync(password, foundUser.password);
        if (isVerifiedUser) {
            jwt.sign(
                { userId: foundUser._id, username: foundUser.username },
                process.env.JWT_SECRET_KEY,
                (err, token) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ error: err, message: "Internal server error" });
                    }
                    return res
                        .cookie('token', token, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            sameSite: 'strict'
                        })
                        .status(200)
                        .json({
                            message: "User logged in successfully",
                            username: foundUser.username,
                            id: foundUser._id
                        });
                }
            );
        } else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: error,
            message: "Error while processing login"
        });
    }
};


userCltr.register = async(req,res)=>{
    const {username,password} = req.body

try {
        const hashedPassword = await bcrypt.hash(password,10)

        const createdUser = await User.create({username,password:hashedPassword})

        jwt.sign({userId:createdUser._id,username:createdUser.username},process.env.JWT_SECRET_KEY,(err,token)=>{
            if(err){
                console.log(err)
                return res.status(500).json({error:err, message: "Internal server error" });

            }
            return res.cookie('token',token,{httpOnly:true,secure:process.env.NODE_ENV==='production',samSite:'strict'})
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

userCltr.profile = async (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({
            error: "Token not provided",
            message: "You must be logged in to access this resource"
        });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET_KEY, {}, (err, userData) => {
            if (err) throw err;
            res.json(userData);
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error,
            message: "Error while fetching profile"
        });
    }
};


module.exports = userCltr