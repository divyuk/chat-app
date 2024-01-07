import { Router } from "express";
import { validateSignIn, validateSignUp } from "../middleware/validators";
import { signIn, signUp } from "../controllers/userController";

// Router
const router: Router = Router();

router.post("/signup", validateSignUp, signUp);

router.post("/signin", validateSignIn, signIn);

export default router;
