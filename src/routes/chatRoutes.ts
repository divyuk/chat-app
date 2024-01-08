import { Router } from "express";
import { verifyToken } from "../controllers/authController";
import { fetchChatHistory } from "../controllers/chatController";

const router: Router = Router();

router.use(verifyToken);

router.route("/").get(fetchChatHistory).post();
