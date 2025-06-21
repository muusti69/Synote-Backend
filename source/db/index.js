import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      "\n MongoDB connected successfully with host as: ",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.error("Mongo DB connection error : ", error);
    throw error;
  }
};

export default connectDB;