import { Router } from "express"
import { getUsers, deleteUser } from "../controllers/userControllers.js"
import { QuerySchema } from "../validators/QuerySchema.ts"
import { validateQuery } from "../middlewares/validateQuery.js"

const userRouter = Router()

userRouter.get("/all", validateQuery(QuerySchema), getUsers)
userRouter.delete("/:id", deleteUser)

export {userRouter}