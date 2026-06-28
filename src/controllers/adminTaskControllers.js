import { Task } from "../models/TaskModel.js"

const adminGetTasks = async (req, res) => {
  try {
    const { filter, sort, page, limit } = req.validatedQuery;

    const taskFilter = {};
    let sortOption = {};

    if (filter) {
      const [field, value] = filter.split(":");

      if (field === "complete") {
        taskFilter.complete = value === "true";
      }

      if (field === "task") {
  taskFilter.$or = [
    { name: { $regex: value, $options: "i" } },
    { description: { $regex: value, $options: "i" } }
  ]}}

    if (sort === "asc") {
      sortOption.createdAt = 1;
    }

    if (sort === "desc") {
      sortOption.createdAt = -1;
    }

        const pageNum = page || 1;
        const limitNum = limit || 10;
        const skip= (pageNum - 1) * limitNum;
    
    const tasks = await Task.find(taskFilter).sort(sortOption).skip(skip).limit(limitNum);

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
      message: OrderedDataTask.length == 0 ? "No hay ninguna tarea para mostrar!" : OrderedDataTask.length == 1 ? "La tarea fue obtenida con éxito" : "Las tareas fueron obtenidas con éxito"
    })
      
  } catch (error) {
    return res.status(500).json({  
      success: false,
      error: "No se pudo obtener tareas" 
    })
  }
}

export {adminGetTasks}