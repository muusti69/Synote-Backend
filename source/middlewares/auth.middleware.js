import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new apiError(401, "Unauthorized request");
  }

  try {
    const { _id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!_id) {
      throw new apiError(401, "Token payload missing user ID");
    }

    const user = await User.findById(_id).select("-password -refreshToken");

    if (!user) {
      throw new apiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new apiError(401, error?.message || "Invalid Access Token");
  }
});
