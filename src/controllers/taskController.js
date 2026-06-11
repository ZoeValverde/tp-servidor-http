import { Task } from "../models/TaskModel.js"

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
   res.status(500).json({
     success: false,
     error: "Error al recuperar productos"
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
    res.status(404).json({
      success: false,
      error: "Id inválido"
     })
  }
}

const createTask = async (req, res) => {

  try { 
    const body = req.body
    const userLogged = req.userLogged
    const nameRegex = /^(?=.*[a-zA-Z])[a-zA-Z\s]{3,20}$/
    const descriptionRegex = /^(?!true$|false$).{1,100}$/
    const error= []

  if (!body.name|| !body.description) {
  error.push("Para crear una tarea se necesita un nombre de titulo y la descrición de tarea")
    } 

if (!nameRegex.test(body.name)) {
  error.push("El nombre debe tener solo letras y espacios, con un mínimo de 3 y máximo de 10 caracteres")
    }
    

if (!descriptionRegex.test(body.description)) {
  error.push("La descripcion no puede estar vacio o con un booleano")
  }

if (error.length > 0) {
  return res.status(400).json({
    success: false,
    error
  })
}

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
    res.status(500).json({
      success: false,
      error: "Error al crear la tarea"
     })
  }
}

const updateTask = async (req, res) => {
  try {
    const id = req.params.id
    const userLogged = req.userLogged
    const body = req.body
    const nameRegex = /^(?=.*[a-zA-Z])[a-zA-Z\s]{3,20}$/
    const descriptionRegex = /^(?!true$|false$).{1,100}$/
    const error = []
    
   if (
      body.name === undefined &&
      body.description === undefined &&
      body.complete === undefined
    ) {
      return res.status(409).json({
        success: false,
        error: "Conflicto, debe haber name, description o complete para poder actualizar"
      })
    }

    if (body.name !== undefined && !nameRegex.test(body.name)) {
  error.push(
    "El nombre debe tener solo letras y espacios, con un mínimo de 3 y máximo de 20 caracteres"
  )
}

if (
  body.description !== undefined &&
  !descriptionRegex.test(body.description)) {
  error.push("La descripción no puede estar vacía o ser un booleano")
}
    if (body.complete !== undefined &&typeof body.complete !== "boolean") {
      error.push("el complete solo puede ser true o false")
    }

if (error.length > 0) {
  return res.status(400).json({
    success: false,
    error
  })
}

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
    res.status(400).json({
      success: false,
      error: "Id invalido"
    })
  }
}

const deleteTask=  async (req, res) => {
  try {
    const id = req.params.id  
    const userLogged = req.userLogged
  const deletedTask = await Task.findOneAndDelete({_id: id, userId: userLogged.id})
  if (!deletedTask) {
    return res.status(404).json({
      sucess: false,
      error: "Tarea no encontrada"
    })
    }

    const task = deletedTask.toObject()
    delete Task.userId

    res.json({
      success: true,
      data: task,
      message: "Tarea eliminada con éxito"
    })
  }
  catch (error) {
    res.status(400).json({
      success: false,
      error: "Id inválido"
    })
  }
}

export {getTask, getTasks,createTask, updateTask, deleteTask}