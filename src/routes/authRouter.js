import { Router } from "express";
import {limiter} from "../middlewares/limiterMiddleware.js"
import { login, register } from "../controllers/authControllers.js";
import { validateSchema } from "../middlewares/validatorZodMidleware.ts";
import {validatorRegisterSchema, validatorLoginSchema } from "../validators/authValidator.ts";

const authRouter = Router()

authRouter.post("/register", validateSchema(validatorRegisterSchema),register)

authRouter.post("/login", limiter, validateSchema(validatorLoginSchema),login)

export {authRouter}