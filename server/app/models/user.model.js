const  mongoose = require( "mongoose")

const UserSchema = new mongoose.Schema({
    fullName:{
        type:String,
        require:true,
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    gender:{
        type:String,
        required:true,
        enum:['male','female','others']
    },
    profilePic:{
        type:String,
        default:""
    }

},{timestamps:true}
) 

const User = mongoose.model("User",UserSchema)

module.exports = User