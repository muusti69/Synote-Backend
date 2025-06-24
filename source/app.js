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

// routes declaration
app.use("/api/v1/users", userRouter);

export { app };
