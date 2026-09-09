import { Router } from "express";
import { validateBody } from "../../shared/middlewares/validate-body.middleware";
import { RegisterUserSchema } from "./user.validation";
import { registerUser } from "./user.controller";

const router = Router();

router.post('/register', validateBody(RegisterUserSchema), registerUser)

export default router;