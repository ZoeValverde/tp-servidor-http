import { Router } from "express"
import { getTask, getTasks, deleteTask, updateTask, createTask } from "../controllers/taskController.js"
import { adminMiddleware } from "../middlewares/adminMiddleware.js"
import { adminGetTasks } from "../controllers/adminTaskControllers.js"

const TaskRouter = Router()

TaskRouter.get("/", getTasks)

TaskRouter.get("/all", adminMiddleware, adminGetTasks)

TaskRouter.get("/:id", getTask)

TaskRouter.post("/", createTask)

TaskRouter.put("/:id", updateTask)

TaskRouter.delete("/:id", deleteTask)


export {TaskRouter}