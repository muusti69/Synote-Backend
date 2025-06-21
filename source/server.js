import connectDB from "./db/index.js";
import dotenv from "dotenv";

//Note for me if dotenv doesn't work add experimental flag in package.json dev command
dotenv.config({
  path: "../config/.env",
});

console.log(process.env.MONGODB_URI)

connectDB()