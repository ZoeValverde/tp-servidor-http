import { Router } from "express"
import { getTask, getTasks, deleteTask, updateTask, createTask } from "../controllers/taskController.js"

const TaskRouter = Router()

TaskRouter.get("/", getTasks)

TaskRouter.get("/:id", getTask)

TaskRouter.post("/", createTask)

TaskRouter.put("/:id", updateTask)

TaskRouter.delete("/:id", deleteTask)


export {TaskRouter}