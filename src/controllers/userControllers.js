import { User } from "../models/userModel.js"

const getUsers = async (req, res) => {
  try {
    const users = await User.find({})

    const orderedDataUser = users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt, 
      updatedAt: user.updatedAt
    }))

    res.json({
      success: true,
      data: orderedDataUser,
      message: "Usuarios mostrados con éxito"
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al recuperar los usuarios"
    })
  }
}



const deleteUser=  async (req, res) => {
  try {
    const id = req.params.id  
   
  const deletedUser = await User.findByIdAndDelete(id)
  if (!deletedUser) {
    return res.status(404).json({
      sucess: false,
      error: "Usuario no encontrado"
    })
      }
      
      
const orderedDataUser = {
      id: deletedUser.id, 
      username: deletedUser.username,
      email: deletedUser.email,
      role: deletedUser.role,
      createdAt: deletedUser.createdAt,
      updatedAt: deletedUser.updatedAt
    }
    res.json({
      success: true,
      data: orderedDataUser,
      message: "Usuario eliminado con éxito"
    })
  }
  catch (error) {
    return res.status(500).json({ 
      success: false,
      error: "Id inválido"
    })
  }
}


export{getUsers, deleteUser}