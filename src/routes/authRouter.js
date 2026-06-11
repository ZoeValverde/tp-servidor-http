import { Router } from "express";
import {limiter} from "../middlewares/limiterMiddleware.js"
import { login, register } from "../controllers/authControllers.js";

const authRouter = Router()

authRouter.post("/register", register)

authRouter.post("/login", limiter, login)

export {authRouter}