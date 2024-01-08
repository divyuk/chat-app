import { Router } from "express";
import { verifyToken } from "../controllers/authController";
import {
  createUserChat,
  fetchChatHistory,
} from "../controllers/chatController";
import { validateUserChat } from "../middleware/validators";

const router: Router = Router();

router.use(verifyToken);

router.route("/").get(fetchChatHistory).post(validateUserChat, createUserChat);

export default router;
