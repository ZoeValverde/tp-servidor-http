import { Task } from "../models/TaskModel.js"
import { config } from "dotenv"
config()

const getTasks = async (req, res) => {
  try {
    const userLogged = req.userLogged
    const filterTasks = await Task.find({userId: userLogged.id},{userId: 0})
   res.json({
     success: true,
     data: filterTasks,
     message: filterTasks.length == 0 ? "No hay ninguna tarea! añade tareas a la lista" : filterTasks.length == 1 ? "La tarea fue obtenida con éxito" : "Las tareas fueron obtenidas con éxito"
   })
  } catch (error) {
   return res.status(500).json({
     success: false,
     error: "Error al recuperar las tareas"
    })
  }
}

const getTask =  async (req, res) => {
  try {
    const id = req.params.id
    const userLogged = req.userLogged

    const foundTask = await Task.findOne({_id: id, userId: userLogged.id},{userId:0})
    if (!foundTask) {
      return res.status(404).json({
        success: false,
        error: "La tarea no fue encontrada"
    })}
    res.json({
      success: true,
     data: foundTask,
     message: "La tarea fue obtenida con éxito" 
    })
   }
  catch (error) {
    return res.status(404).json({
      success: false,
      error: "Error al obtener la tarea"
     })
  }
}

const createTask = async (req, res) => {

  try { 
    const body = req.body
    const userLogged = req.userLogged

const foundTask = await Task.findOne({
  name: body.name.toLowerCase(),
  userId: userLogged.id
})

if (foundTask) {
  return res.status(409).json({
    success: false,
    error: "Hubo un conflicto, la tarea ya existe"
  })
}
  const newTask = await Task.create({
    name: body.name,
    description: body.description,
    complete: body.complete,
    userId: userLogged.id
  })
  
  newTask.save()

  const publicDataTask = {
    id: newTask._id,
    name: newTask.name,
    description: newTask.description,
    complete: newTask.complete,
    createAt: newTask.createdAt,
    updateAt: newTask.updatedAt
  }
    res.json({
      success: true,
      data: publicDataTask,
      message: "Tarea creada con éxito"
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      error: "Error al crear la tarea"
     })
  }
}

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const userLogged = req.userLogged;
    
    const updatedTask = await Task.findOneAndUpdate({_id: id, userId: userLogged.id},  {...body }, { returnDocument: "after" , projection: {userId: 0}})
    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        error: "Tarea no encontrado"
        })
    }
        
    res.json({
      success: true,
      data: updatedTask,
      message: "Tarea actualizada con éxito"
    })
  }
  catch (error) {
    return res.status(400).json({
      success: false,
      error: "Error al actualizar la tarea"
    })
  }
}
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params
    const userLogged = req.userLogged

    const AdminUser = userLogged.role === "admin"

    const deletedTask = AdminUser? await Task.findByIdAndDelete(id) : await Task.findOneAndDelete({ _id: id, userId: userLogged.id })

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        error: "Tarea no encontrada"
      })
    }

    const task = deletedTask.toObject()
    delete task.userId

    res.json({
      success: true,
      data: task,
      message: "Tarea eliminada con éxito"
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      error: "Error al eliminar la tarea"
    })
  }
}
export {getTask, getTasks,createTask, updateTask, deleteTask}