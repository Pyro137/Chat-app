import User from "../models/user.model.js"
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js"

export const getUsersForSideBar=async(req,res)=>{
    try{
        const loggedInUserId=req.user._id
        const filteredUsers= await User.find({_id:{$ne:loggedInUserId}}).select("-password")

        res.status(200).json(filteredUsers)
    }catch(error){
        console.log("Error in getuserForsidebar")
        res.status(500).json({error:"Internal server Error"})
    }
}

export const getMessages=async(req,res)=>{
    try{
        const{id:userToChatId}=req.params

        const myId=req.user._id
        
        const messages=await Message.find({
            $or:[
                {senderId:senderId,receiverId:myId},
                {senderId:myId,receiverId:senderId}
            ]
        })

        res.status(200).json(messages)
    }catch(error){
        console.log("Error in ")
        res.status(500).json({error:"Internal server Error"})
    }
}

export const sendMessage=async(req,res)=>{
    try{
        const myId=req.user._id
        const {text,image}=req.body
        const {id:receiverId}=req.params

        let imageUrl;
        if(image){
            const uploadResponse=await cloudinary.uploader.upload(image)
            imageUrl= uploadResponse.secure_url
        }

        const newMessage=await new Message({
            senderId:myId,
            receiverId:receiverId,
            text:text,
            image:imageUrl
        })

        await newMessage.save()
        res.status(201).json(newMessage)
    }catch(error){
        console.log("Error in sendMessage")
        res.status(500).json({error:"Internal server Error"})
    }
}