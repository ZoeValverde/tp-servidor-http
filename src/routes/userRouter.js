import { Router } from "express"
import { getUsers, deleteUser } from "../controllers/userControllers.js"

const userRouter = Router()

userRouter.get("/all", getUsers)
userRouter.delete("/:id", deleteUser)

export {userRouter}