import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from "bcrypt"
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

export const signIn=(req,res)=>{
    res.send("route signin")


}

export const logOut=(req,res)=>{
    res.send("route logout")



}


