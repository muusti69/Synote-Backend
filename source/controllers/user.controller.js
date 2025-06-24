import { User } from "../models/user.model.js";
import { apiError } from "../utits/apiError.js";
import { apiResponse } from "../utits/apiResponse.js";
import { asyncHandler } from "../utits/asyncHandler.js";
import jwt from "jsonwebtoken";

const options = {
  httpOnly: true,
  secure: true,
  sameSite: "Strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

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
  let { name, email, password } = req.body;

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

const loginUser = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  email = email?.trim();
  password = password?.trim();

  if (!email || !password)
    throw new apiError(400, "Provide both email and password");

  const user = await User.findOne({ email });

  if (!user) throw new apiError(409, "User does not exist");

  const isPasswordCorrect = await user.checkPassword(password);

  if (!isPasswordCorrect) throw new apiError(401, "Incorrect Password");

  const { accessToken, refreshToken } = await generateAccessAndRefrehToken(
    user._id
  );

  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.refreshToken;

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new apiResponse(
        200,
        {
          user: userObj,
          accessToken,
          refreshToken,
        },
        "User Logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: undefined },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, {}, "User Logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const incomingRefereshToken =
      req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefereshToken) throw new apiError(401, "Unauthorized Request");

    const decodedToken = jwt.verify(
      incomingRefereshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user =await User.findOne(decodedToken?._id);

    if (!user) throw new apiError(401, "Invalid Refresh Token");

    if (incomingRefereshToken !== user?.refreshToken)
      throw new apiError(401, "Refresh Token expired or invalid");

    const { accessToken, newRefreshToken } = await generateAccessAndRefrehToken(
      user._id
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new apiResponse(
          200,
          {
            accessToken,
            refreshToken: newRefreshToken,
          },
          "Access Token Refreshed"
        )
      );
  } catch (error) {
    throw new apiError(401, error?.message || "Invalid Refresh Token");
  }
});

export { registerUser, loginUser, logoutUser, refreshAccessToken };
