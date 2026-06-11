import express from "express"
import bcrypt from "bcryptjs" 
import { TaskRouter } from "./routes/TaskRouter.js"
import { connectDb } from "./config/mongoDbConnection.js"
import { authRouter } from "./routes/authRouter.js"
import {authMiddleware} from "./middlewares/authMiddleware.js"
import { config } from "dotenv"
import cors from "cors"

config()
process.loadEnvFile()

const server = express()
let PORT = process.env.PORT


server.use(express.json())
server.use(cors())

server.get("/api", (req, res) => {
  res.status(200).json([{
    success: true,
    message: "Conexión con API REST"
    }])
})

server.use("/api/tasks", authMiddleware, TaskRouter)

server.use("/api/auth",  authRouter)

server.listen(PORT, () => {
  connectDb()
  console.log(`servidor http://localhost:${PORT}`)
  
}) 

