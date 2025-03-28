import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import cloudinary from "../lib/cloudinary.js"

export const signUp=async(req,res)=>{
    try{
        const {fullName,email,password}=req.body;
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
          }
        
          if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
          }
        
          const user = await User.findOne({ email });
        
          if (user) return res.status(400).json({ message: "Email already exists" });
        
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
        
          const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
          });

          if (newUser) {
            generateToken(newUser._id,res)
            await newUser.save()

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic
            })
          }else{
            res.status(400).json({message:"Invalid user data"})
          }


    }catch(error){
        console.log("Error auth controller",error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const signIn=async(req,res)=>{
    const {email,password}=req.body
    try{
      const user=await User.findOne({email})

      if(!user){
        res.send(400).json({message:"Invalid Crediantials"})
      }
      
      const isHasPasswordTrue=await bcrypt.compare(password,user.password)
      if(!isHasPasswordTrue){
        res.send(400).json("Invalid Crediantials")
      }

      generateToken(user._id,res)

      res.status(200).json({
        _id:user._id,
        fullName:user.fullName,
        email:user.email,
        profilePic:user.profilePic
      })
      

    }catch (error){
      res.status(500).json({message:"Internal Server error"})
    }
}

export const logOut=(req,res)=>{
  try{
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({
      message:"Logged out successfully"
    })
  }catch(error){  
    console.log("Log out controller error ",error)
    res.status(500).json({message:"Internal Server Error"})
  }

}


export const updateProfile=async(req,res)=>{
  try{
    const {profilePic} =req.body;
    const userId=req.user._id
    if(!profilePic){
      return res.send(400).json({message:"Profile picture is required."})
    }
    const uploadResponse=await cloudinary.uploader.upload(profilePic)
    console.log("Upload Response",uploadResponse)
    const updatedUser=await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true}) //new true will return after updated.

    res.status(200).json(updatedUser)

  }catch(error){
    console.log("Error on Update profile")
    res.send(500).json({message:"Internal server error"})
  }
}

export const checkAuth=(req,res)=>{
  try{
    res.status(200).json(req.user)
  }catch(error){
    console.log("Error in checkAuth controller",error.message)
    res.send(500).json({message:"Internal Server Error"})
  }
}