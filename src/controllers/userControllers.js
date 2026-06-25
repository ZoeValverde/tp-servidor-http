import { User } from "../models/userModel.js"
import { config } from "dotenv"
config()

const getUsers = async (req, res) => {
    try {
    
  const userLogged = req.userLogged
        
 if (userLogged.email == process.env.ADMIN_EMAIL) {
     const users = await User.find({}, "email username role")
     
const OrderedDataUser = users.map(user => ({
  id: user._id,
  username: user.username,
  email: user.email,
  role: user.role,
}));

res.json({
  success: true,
  data: OrderedDataUser,
  message: "Usuarios mostrados con éxito"
});
      
 }

 else {
     res.status(403).json({
     success: false,
     error: "Acceso denegado"
    })
        }
        

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
      const userLogged = req.userLogged

      if (userLogged.email !== process.env.ADMIN_EMAIL) {
     return res.status(403).json({
      success: false,
      error: "Usuario Inválido"
    })
      }
      
  const deletedUser = await User.findOneAndDelete({_id: id})
  if (!deletedUser) {
    return res.status(404).json({
      sucess: false,
      error: "Usuario no encontrado"
    })
      }
      
    const user = deletedUser.toObject()
        delete user._id     

      
const OrderedDataUser = {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    createAt: user.createdAt,
    updateAt: user.updatedAt
};
    res.json({
      success: true,
      data: OrderedDataUser,
      message: "Usuario eliminada con éxito"
    })
  }
  catch (error) {
    return res.status(400).json({ 
      success: false,
      error: "Id inválido"
    })
  }
}


export{getUsers, deleteUser}