import express from "express"
import authRoutes from "../src/routes/auth.routes.js"
import messageRoutes from "../src/routes/message.routes.js"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser"

dotenv.config()
const PORT=process.env.PORT

const app=express()

app.use(express.json())
app.use(cookieParser())

//routes
app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)



app.get("/",(req,res)=>{
    console.log("Expres")
    res.send("naber")
})

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT} `)
    connectDB()
})