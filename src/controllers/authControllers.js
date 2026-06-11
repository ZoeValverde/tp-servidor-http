import { User } from "../models/userModel.js"
import bcrypt from "bcryptjs" 
import jwt from "jsonwebtoken"
import { config } from "dotenv"
config()

const register = async (req, res) => { 
  try {
  const body = req.body
  const { password, username, email } = body
  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  })
  
  newUser.save()

  const publicDataUser = {
    id: newUser.id,
    username: newUser.username,
    email: newUser.email,
    createAt: newUser.createdAt,
    updatedAt: newUser.updatedAt
  }

    res.json({
     success: true,
      data: publicDataUser,
      message: "Usuario creado con éxito"
  })
  }
  catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al registrar el usuario",
    },
    )
  }
  
}

const login=  async (req, res) => {
  try{
  const { body } = req

  const { email, password } = body
  
  if (!email || !password) {
    return res.status(401).json({
      success: false,
      error: "unauthorized"
    })
  }

    const foundUser = await User.findOne({ email })    
  if (!foundUser) {
    return res.status(403).json({
      success: false,
      error: "Usuario no encontrado"
    })
  }

  const ValidPassword = await bcrypt.compare(password, foundUser.password)
  
  if (!ValidPassword) {
    return res.status(403).json({
      success: false,
      error: "unauthorized"
     })
  }
  const payload = {id: foundUser._id, username: foundUser.username, email: foundUser.email}
    const secretKey = process.env.JWT_SECRET
    console.log("JWT_SECRET:", process.env.JWT_SECRET)
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" })
  

    
    res.json({ 
      success: true,
      data: {token},
      message: "Logueado con éxito"
    },
    
    )
  }
  catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al Loguearse"
    })
  }
}

export {register, login}