import { Router } from "express"
import { getTask, getTasks, deleteTask, updateTask, createTask } from "../controllers/taskController.js"
import { adminMiddleware } from "../middlewares/adminMiddleware.js"
import { adminGetTasks } from "../controllers/adminTaskControllers.js"
import { createTaskSchema, updateTaskSchema, taskIdSchema } from "../validators/taskValidator.ts"
import { validateSchema } from "../middlewares/validateSchema.ts"

const TaskRouter = Router()

TaskRouter.get("/", getTasks)

TaskRouter.get("/all", adminMiddleware, adminGetTasks)

TaskRouter.get("/:id", validateSchema(taskIdSchema, "params"), getTask)

TaskRouter.post("/", validateSchema(createTaskSchema), createTask)

TaskRouter.put("/:id",  validateSchema(taskIdSchema, "params") ,validateSchema(updateTaskSchema), updateTask)

TaskRouter.delete("/:id",  validateSchema(taskIdSchema, "params"),deleteTask)


export {TaskRouter}