import { Router } from "express";
import { validateSignUp } from "../middleware/validators";
import { signUp } from "../controllers/userController";

// Router
const router: Router = Router();

router.post("/sign-up", validateSignUp, signUp);

export default router;
