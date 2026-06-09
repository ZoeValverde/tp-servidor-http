import express from "express"
import bcrypt from "bcryptjs" 
import { ProductRouter } from "./routes/productRouter.js"
import { connectDb } from "./config/mongoDbConnection.js"
import { authRouter } from "./routes/authRouter.js"
import {authMiddleware} from "./middlewares/authMiddleware.js"


const server = express()

server.use(express.json())

const PORT = 40000


server.get("/", (req, res) => {
  res.status(200).json([{
    success: true,
    message: "Conexión con API REST"
    }])
})

server.use("/products", authMiddleware, ProductRouter)//
server.use("/auth",  authRouter)



server.listen(PORT, () => {
  connectDb()
    console.log(`servidor http://localhost:${PORT}`)
}) 

