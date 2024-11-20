const Conversation = require("../models/conversation.model")
const Message = require("../models/message.model")

const messagesCltr = {}


messagesCltr.sendMessage = async(req,res)=>{
    try {
        const {message } = req.body
        const {id:receiverId} = req.params
        const senderId = req.user._id
        if (!message || !receiverId) {
            return res.status(400).json({ error: "Message and receiver ID are required." });
          }

        let conversation =  await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        })

        if(!conversation) {
            conversation = await Conversation.create({
               participants:[senderId,receiverId] 
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        await newMessage.save()

        if(newMessage && newMessage._id){
            conversation.message.push(newMessage._id)
        }

        await conversation.save()
        a

        return res.status(201).json(newMessage)
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Internal server error"})
    }
}

module.exports = messagesCltr