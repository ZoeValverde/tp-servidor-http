import { Product } from "../models/productModel.js"

const getProducts = async (req, res) => {
 try {
    const userLogged = req.userLogged
    const filterProducts = await Product.find({ userId: userLogged.id},{userId: 0})
   res.json({
     success: true,
     data: filterProducts,
     message: filterProducts.length== 0? "No hay ningún producto! añade productos a la lista": filterProducts.length== 1? "El producto fue obtenido con éxito" : "Los productos fueron obtenidos con éxito"
   }
   )
  } catch (error) {
   res.status(500).json({
     success: false,
     error: "Error al recuperar productos"
    })
  }
}

const getProduct =  async (req, res) => {
  try {
    const id = req.params.id
    const userLogged = req.userLogged
    const foundProduct = await Product.findOne({_id: id, userId: userLogged.id},{userId:0})
    if (!foundProduct) {
      return res.status(404).json({
        success: false,
        error: "El producto no fue encontrado"
    })}
    res.json({
      success: true,
     data: foundProduct,
     message: "El producto fue obtenido con éxito" 
    })
   }
  catch (error) {
    res.status(404).json({
      success: false,
      error: "Id inválido"
     })
  }
}

const createProduct=  async (req, res) => {
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
    res.json({
      success: true,
      data: publicDataProduct,
      message: "Producto creado con éxito"
    })
  }
  catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al crear el producto"
     })
  }
}

const updateProduct =  async (req, res) => {
  try {
    const id = req.params.id
    const userLogged = req.userLogged
    const body = req.body
    const updatedProduct = await Product.findOneAndUpdate({_id: id, userId: userLogged.id},  {...body, available: body.stock > 0 }, { returnDocument: "after" , projection: {userId: 0}})
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        error: "Producto no encontrado"
        })
    }
        
    res.json({
      success: true,
      data: updatedProduct,
      message: "Producto actualizado con éxito"
    })
  }
  catch (error) {
   
    res.status(400).json({
      success: false,
      error: "Id invalido"
    })
  }
}

const deleteProduct=  async (req, res) => {
  try {
    const id = req.params.id  
    const userLogged = req.userLogged
  const deletedProduct = await Product.findOneAndDelete({_id: id, userId: userLogged.id})
  if (!deletedProduct) {
    return res.status(404).json({
      sucess: false,
      error: "Producto no encontrado"
    })
    }

    const product = deletedProduct.toObject()
    delete product.userId

    const publicDataProject = {...deletedProduct}

    res.json({
      success: true,
      data: product,
      message: "Producto eliminado con éxito"
    })
  }
  catch (error) {
    res.status(400).json({
      success: false,
      error: "Id inválido"
    })
  }
}

export {getProducts, getProduct, createProduct, updateProduct, deleteProduct}