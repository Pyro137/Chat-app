import express from "express"
import authRoutes from "../src/routes/auth.routes.js"
import messageRoutes from "../src/routes/message.routes.js"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import bodyParser from "body-parser"
import { app,server } from "./lib/socket.js"
import path from "path"


dotenv.config()
const PORT=process.env.PORT

const __dirname=path.resolve()

app.use(bodyParser.json({limit: '50mb'}))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
//routes
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
  }

app.get("/",(req,res)=>{
    console.log("Expres")
    res.send("naber")
})

server.listen(PORT,()=>{
    console.log(`Server running on ${PORT} `)
    connectDB()
})