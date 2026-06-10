import express from "express"
import bcrypt from "bcryptjs" 
import { ProductRouter } from "./routes/productRouter.js"
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



server.get("/", (req, res) => {
  res.status(200).json([{
    success: true,
    message: "Conexión con API REST"
    }])
})

server.use("/products", authMiddleware, ProductRouter)

server.use("/auth",  authRouter)

server.listen(PORT, () => {
  connectDb()
    console.log(`servidor http://localhost:${PORT}`)
}) 

