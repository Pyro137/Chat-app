import express from "express"
import authRoutes from "../src/routes/auth.routes.js"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js"

dotenv.config()
const PORT=process.env.PORT

const app=express()

app.use(express.json())


//routes
app.use("/api/auth",authRoutes)


app.get("/",(req,res)=>{
    console.log("Expres")
    res.send("naber")
})

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT} `)
    connectDB()
})