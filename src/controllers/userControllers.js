import { User } from "../models/userModel.js"

const getUsers = async (req, res) => {
  try {

    const { filter, sort, limit, page } = req.validatedQuery;

    const userFilter = {};
     let sortOption = {};

    if (filter) {
    
    const [field, value] = filter.split(":");

  if (field === "username") {userFilter.username = {$regex: value, $options: "i"};}

      if (field === "role") { userFilter.role = value; }
  }

  if (sort === "asc") {sortOption.createdAt = 1;}

  if (sort === "desc") {sortOption.createdAt = -1;}
        
    const pageNum = page || 1;
    const limitNum = limit || 10;
    const skip = (pageNum - 1) * limitNum;

    const users = await User.find(userFilter).sort(sortOption).skip(skip).limit(limitNum);

    const orderedDataUser = users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }));

    res.json({
      success: true,
      data: orderedDataUser,
      message: orderedDataUser.length === 0? "No hay usuarios para mostrar": orderedDataUser.length === 1? "El usuario fue obtenido con éxito.": "Los usuarios fueron obtenidos con éxito."
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Error al recuperar los usuarios"
    });
  }
};

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