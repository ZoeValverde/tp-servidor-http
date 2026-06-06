import express from "express"
import bcrypt from "bcryptjs"
import { rateLimit } from "express-rate-limit"
import jwt from "jsonwebtoken"

const products = [
  {
    id: 1,
    name: "Teclado Mecánico",
    price: 45000,
    stock: 12
  },
  {
    id: 2,
    name: "Mouse Gamer",
    price: 25000,
    stock: 8
  },
  {
    id: 3,
    name: "Monitor 24 pulgadas",
    price: 180000,
    stock: 5
  },
  {
    id: 4,
    name: "Auriculares Bluetooth",
    price: 32000,
    stock: 15
  },
  {
    id: 5,
    name: "Webcam HD",
    price: 27000,
    stock: 10
  }
]
const users = []

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


server.get("/", (req, res) => {
    res.json([{"status": 1}])
})

server.get("/products", (req, res) => {
    res.json(products)
})

server.get("/products/:id", (req, res) => {
    const id = +req.params.id
    const foundProduct = products.find(product => product.id === id)
    if (!foundProduct) {
        return res.status(404).json({error:"Not found"})
    }
    res.json(foundProduct)
})

server.post("/products", (req, res) => {
    const body = req.body
    const newProduct = {
    id: products.length + 1, ...body
  }
  products.push(newProduct)
    res.json(newProduct)
})

server.put("/products/:id", (req, res) => {
    const id = +req.params.id
    const body = req.body
    const foundProduct = products.find(product => product.id === id)
    if (!foundProduct) {
        return res.status(404).json({error:"Not found"})
    }

    if (body.name) foundProduct.name = body.name
    if (body.price) foundProduct.price = body.price
    if (body.stock) foundProduct.stock = body.stock
        
    res.json(foundProduct)
})

server.delete("/products/:id", (req, res) => {
    const id = +req.params.id
    const index = products.findIndex(product => product.id === id)
    if(index=== -1) return res.status(404).json({error: "not found"})
    products.splice(index, 1) 
    res.json({message: "Producto eliminado"})

})

server.post("/auth/register", async (req, res) => { 
  const body = req.body
  const id = users.length + 1
  const { password, username, email } = body
  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = {
    id,
    username,
    email,
    password: hashedPassword,
  }
  
  users.push(newUser)
  const {password: passwordNewUser, ...data}= newUser

  res.json(data)
  
})

server.post("/auth/login", limiter, async (req, res) => {
  const {body} = req

  const { email, password } = body
  
  if (!email || !password) {
    return res.status(401).json({error :"unauthorized"})
  }

  const foundUser = users.find(user => user.email === email)
  if (!foundUser) {
    return res.status(403).json({error :"unauthorized"})
  }

  const ValidPassword = await bcrypt.compare(password, foundUser.password)
  
  if (!ValidPassword) {
     return res.status(403).json({error :"unauthorized"})
  }
  const payload = {id: foundUser.id, username: foundUser.username, email: foundUser.email}
  const secretKey = "contraseñasecreta"
  const token = jwt.sign(payload, secretKey, { expiresIn:"1min"})

   res.json({token})
})




server.listen(PORT, () => {
    console.log(`servidor http://localhost:${PORT}`)
}) 