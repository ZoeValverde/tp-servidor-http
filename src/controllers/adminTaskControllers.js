import { Task } from "../models/TaskModel.js"

const adminGetTasks = async (req, res) => {
  try {   
    const tasks = await Task.find().populate("userId", "username email") 

    const OrderedDataTask = tasks.map(task => ({
      id: task._id,
      name: task.name,
      description: task.description,
      complete: task.complete,
      user: task.userId?.username 
    }))

    return res.json({      
      success: true,
      data: OrderedDataTask,
       message: OrderedDataTask.length == 0 ? "No hay ninguna tarea creada para mostrar!" : OrderedDataTask.length == 1 ? "La tarea fue obtenida con éxito" : "Las tareas fueron obtenidas con éxito"
    })
      
  } catch (error) {
    return res.status(500).json({  
      success: false,
      error: "No se pudo obtener tareas" 
    })
  }
}

export {adminGetTasks}