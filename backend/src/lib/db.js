import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

export const connectDB=async()=>{
    try{
        const conn=mongoose.connect(process.env.MONGODB_URI)
        console.log(`Mongo db connection in ${(await conn).connection.host}`)
    }catch(error){
        console.log("MongoDB connection error",error)
    }
}