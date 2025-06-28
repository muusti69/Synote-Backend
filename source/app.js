import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { limitter } from "./constant.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: limitter }));
app.use(express.urlencoded({ extended: true, limit: limitter }));
app.use(cookieParser());

// import routes
import userRouter from "./routes/user.routes.js";
import notesRouter from "./routes/notes.routes.js";
import tasksRouter from "./routes/tasks.routes.js";
import subtaskRouter from "./routes/subtask.routes.js";
import aiRouter from "./routes/ai.routes.js";

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/notes", notesRouter);
app.use("/api/v1/tasks", tasksRouter);
app.use("/api/v1/tasks/:id/subtask", subtaskRouter);
app.use("/api/v1/ai",aiRouter);
export { app };
