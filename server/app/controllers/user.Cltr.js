const User = require("../models/user.model")

const userCltr = {}


userCltr.getUsersSidebar = async(req,res)=>{
    try {
        const loggedInUser = req.user._id

        const allUsers = await User.find({
            _id:{$ne:loggedInUser}
        }).select("-password")

        return res.status(200).json({data:allUsers})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error:"Internal server error"
        })
        
    }
}




module.exports = userCltr


