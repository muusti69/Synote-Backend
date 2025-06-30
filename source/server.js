import connectDB from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 8000;

(async function startServer() {
  try {
    await connectDB();
    const server = app.listen(port, () => {
      console.log("Server started at port: ", port);
    });
    server.on("error", (error) => {
      console.error("Error occured while booting up server", error);
      process.exit(1);
    });
  } catch (error) {
    console.error("MongoDB connection failed!!! : ", error);
    process.exit(1);
  }
})();