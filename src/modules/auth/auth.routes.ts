import { Router } from "express";
import { validateBody } from "../../shared/middlewares/validate-body.middleware";
import { loginSchema } from "./auth.validation";
import { login } from "./auth.controller";

const router = Router();

router.post('/login', validateBody(loginSchema), login)

export default router;