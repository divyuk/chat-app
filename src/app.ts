import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import userRouter from "./routes/userRoutes";
import responseMiddleware from "./middleware/responseMiddleware";

import chatRouter from "./routes/chatRoutes";
// import messageRouter from "./routes/messageRoutes";
// import responseMiddleware from "./middleware/responseMiddleware";
// import AppResponse from "./helpers/AppResponse";
// import { commonResponseMessages } from "./data/constants";

const app: Express = express();

app.use(cors());
// set security http headers
app.use(helmet());

// middleware for parsing request
app.use(express.json());

//? Database Connectionnpm install mongodb
if (process.env.NODE_ENV !== "test") {
  const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not defined in the environment variables");
  } else {
    mongoose
      .connect(MONGODB_URI)
      .then(() => console.log("Successfully DB connected"))
      .catch((err) => console.error("Problem in connecting Database", err));
  }
}

// api routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/chat", chatRouter);
// app.use("/api/messages", messageRouter);

// app.use((req: Request, res: Response, next: NextFunction) => {
//   throw next(new AppResponse(commonResponseMessages.RESOURCE_NOT_FOUND));
// });
//? Act as global error handler and response mechanism
app.use(responseMiddleware);

export default app;
