import { User } from "../models/user.model.js";
import { apiError } from "../utits/apiError.js";
import { apiResponse } from "../utits/apiResponse.js";
import { asyncHandler } from "../utits/asyncHandler.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefrehToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiError(500, "Error while generating access and refresh tokens");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  try {
    name = name?.trim();
    email = email?.trim();
    password = password?.trim();

    if (!name || !email || !password) {
      throw new apiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      throw new apiError(409, "User with same email already exists");
    }

    const user = await User.create({ name, email, password });

    if (!user || !user._id) {
      throw new apiError(500, "Failed to register user");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefrehToken(
      user._id
    );

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.refreshToken;

    res
      .status(201)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new apiResponse(
          201,
          {
            user: userObj,
            accessToken,
            refreshToken,
          },
          "User Registered Successfully"
        )
      );
  } catch (error) {
    console.error("Error during user registration:", error.message);
    throw error;
  }
});

export { registerUser };
