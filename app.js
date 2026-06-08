import express from "express"
import bcrypt from "bcryptjs" 
import { rateLimit } from "express-rate-limit"
import jwt from "jsonwebtoken"
import {connect, Schema, model} from "mongoose"

const connectDb = async () => {
  
  try {

    await connect("mongodb://localhost:27017/products_db")
    console.log("se conecto al db")

   }
  catch (error) {
    console.log("error conexion db", error.message)
  }

}

const userSchema = new Schema({
  username: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password:{type: String, required: true}
},
  {
    versionKey: false,
    timestamps:true
}
)
const User = model("users", userSchema)

const productSchema = new Schema({
  name: {type: String, required: true},
  price: {type: Number, default: 0, required: true},
  stock: {type:Number, default: 0, required: true},
  available: { type: Boolean, default: false },
  userId:{type: Schema.Types.ObjectId, ref:"User", required: true}
},
{
    versionKey: false,
    timestamps:true
}
)

const Product= model("Product", productSchema)

const server = express()

server.use(express.json())

const PORT = 40000

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  limit: 5, 

  handler: (request, response) => {
    response.status(429).json({ error: "Too many requests, please try again later." })
  }
})

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization
  
  if (!header || !header.startsWith("Bearer")) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  const token = header.split(" ")[1]

  try {
    const decoded = jwt.verify(token, "contraseñasecreta")
    
    req.userLogged = decoded
  } catch (e) {
    res.status(401).json({error: e.message})
 }
  next()
}

server.get("/", (req, res) => {
    res.json([{"status": 1}])
})

server.get("/products", authMiddleware, async (req, res) => {
 try {
    const userLogged = req.userLogged
    const filterProducts = await Product.find({ userId: userLogged.id })
    res.json(filterProducts)
  } catch (error) {
    res.status(500).json({error: "Error fetching products" })
  }
})


server.get("/products/:id", async (req, res) => {
  try {
    const id = req.params.id
  const foundProduct = await Product.findById(id)
    if (!foundProduct) { res.status(404).json({error:"Not found"})}
    res.json(foundProduct)
   }
  catch (error) {
    res.status(404).json({error: "not found" })
  }
})

server.post("/products", authMiddleware, async (req, res) => {
  try { 
    const body = req.body
  const userLogged = req.userLogged

  const newProduct = await Product.create({
    name: body.name,
    price: body.price,
    stock: body.stock,
    available: body.stock > 0, 
    userId: userLogged.id
  })
  
  newProduct.save()

  const publicDataProduct = {
    id: newProduct._id,
    name: newProduct.name,
    price: newProduct.price,
    stock: newProduct.stock,
    available: newProduct.available,
    createAt: newProduct.createdAt,
    updateAt: newProduct.updatedAt
  }
    res.json(publicDataProduct)
  }
  catch (error) {
     res.status(500).json({error: "no se creo el producto"})
  }
})

server.put("/products/:id", async (req, res) => {
  try {
      const id = req.params.id
    const body = req.body
    const foundProduct = await Product.findByIdAndUpdate(id, body, {new: true})
    if (!foundProduct) {
        return res.status(404).json({error:"Not found"})
    }

    if (body.name) foundProduct.name = body.name
    if (body.price) foundProduct.price = body.price
  if (body.stock) foundProduct.stock = body.stock
  if(body.available) foundProduct.available = body.available
        
    res.json(foundProduct)
  }
  catch (error) {
   
   res.status(400).json({ error: "Id invalido" })
  }
})

server.delete("/products/:id", async (req, res) => {
  try {
    const id = req.params.id  
  const foundProduct = await Product.findByIdAndDelete(id)
  if (!foundProduct) {
      return res.status(404).json({ error: "Not found" })
    }
  res.json({message: "Producto eliminado"})
  }
  catch (error) {
    res.status(400).json({error: "Invalid Id"})
  }
})

server.post("/auth/register", async (req, res) => { 
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

  res.json(publicDataUser)
  
})

server.post("/auth/login", limiter, async (req, res) => {
  try{
  const { body } = req

  const { email, password } = body
  
  if (!email || !password) {
    return res.status(401).json({error :"unauthorized"})
  }

    const foundUser = await User.findOne({ email })    
  if (!foundUser) {
    return res.status(403).json({error :"unauthorized"})
  }

  const ValidPassword = await bcrypt.compare(password, foundUser.password)
  
  if (!ValidPassword) {
     return res.status(403).json({error :"unauthorized", ValidPassword})
  }
  const payload = {id: foundUser._id, username: foundUser.username, email: foundUser.email}
  const secretKey = "contraseñasecreta"
  const token = jwt.sign(payload, secretKey, { expiresIn:"1h"})

    res.json({ token })
  }
  catch (error) {
    res.status(500).json({error: error.message})
  }
})




server.listen(PORT, () => {
  connectDb()
    console.log(`servidor http://localhost:${PORT}`)
}) 