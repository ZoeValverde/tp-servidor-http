import { Router } from "express"
import { getTask, getTasks, deleteTask, updateTask, createTask } from "../controllers/taskController.js"
import { adminMiddleware } from "../middlewares/adminMiddleware.js"
import { adminGetTasks } from "../controllers/adminTaskControllers.js"
import { createTaskSchema, updateTaskSchema, taskIdSchema } from "../validators/taskValidator.ts"
import { validateSchema } from "../middlewares/validatorZodMidleware.ts"
import { QuerySchema } from "../validators/QuerySchema.ts"
import { validateQuery } from "../middlewares/validateQuery.js"


const TaskRouter = Router()

TaskRouter.get("/", validateQuery(QuerySchema), getTasks)

TaskRouter.get("/all", adminMiddleware, validateQuery(QuerySchema), adminGetTasks)

TaskRouter.get("/:id", validateSchema(taskIdSchema, "params"), getTask)

TaskRouter.post("/", validateSchema(createTaskSchema), createTask)

TaskRouter.put("/:id",  validateSchema(taskIdSchema, "params") ,validateSchema(updateTaskSchema), updateTask)

TaskRouter.delete("/:id",  validateSchema(taskIdSchema, "params"),deleteTask)


export {TaskRouter}