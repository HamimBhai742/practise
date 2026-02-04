import { Router } from "express";
import { authController } from "./auth.controller";
import { validateRequest } from "../../middleware/validation";
import { userLoginZodSchema } from "./auth.zod.validation";

const router=Router()

router.post("/login", validateRequest(userLoginZodSchema),authController.loginUserFromDB)

export const authRoutes=router