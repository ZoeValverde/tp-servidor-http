import express from "express"

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

const server = express()

server.use(express.json())
const PORT = 40000

server.get("/", (req, res) => {
    res.json([{"status": "1"}])
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

server.listen(PORT, () => {
    console.log(`servidor http://localhost:${PORT}`)
}) 