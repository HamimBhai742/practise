import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middleware/validation";
import { userZodSchema } from "./user.zod.validation";

const router=Router()

router.post('/register',validateRequest(userZodSchema),userController.registerUserIntoDB)

export const userRoutes=router