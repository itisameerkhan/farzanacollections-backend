import validator from "validator";
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import sendOtpEmail from "../config/mail.js";
import { TempUser } from "../models/tempUser.js";
import jwt from "jsonwebtoken";

export const signupController = async (req, res, next) => {
  try {
    const otpStore = new Map();
    const { name, email, password } = req.body;

    if (name == "" || email == "" || password == "") {
      throw new Error("All fields required");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Invalid Email");
    }

    if (!validator.isStrongPassword(password)) {
      throw new Error("Password is not strong enough");
    }

    const validUser = await User.findOne({ email });
    if (validUser) {
      throw new Error("User already existed in our server");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await TempUser.deleteMany({ email });

    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit

    otpStore.set(email, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });

    await sendOtpEmail(email, otp);

    const user = new TempUser({
      name,
      email,
      password: hashedPassword,
      otp,
    });

    await user.save();

    res.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (e) {
    next(e);
  }
};

export const signupOtpController = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const tempUser = await TempUser.findOne({ email });

    if (!tempUser) {
      throw new Error("user not found");
    }

    if (otp != tempUser.otp) {
      throw new Error("Invalid OTP");
    }

    const userObj = {
      name: tempUser.name,
      email: tempUser.email,
      password: tempUser.password,
    };

    const dupUser = await User.findOne({ email });

    if (dupUser) {
      throw new Error("user already existed in our server");
    }

    const user = new User(userObj);

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.cookie("fcToken", token);

    await TempUser.deleteMany({ email });

    res.json({
      success: true,
      message: "user created successfully",
      data: user,
    });
  } catch (e) {
    next(e);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      throw new Error("Email is not valid");
    }
    if (!validator.isStrongPassword(password)) {
      throw new Error("password is not strong");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("user not found");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.cookie("fcToken", token);

    res.json({
      success: true,
      message: "Login successfull",
      data: user,
    });
  } catch (e) {
    next(e);
  }
};
 
export const userAuth = async (req, res, next) => {
  try {
    const cookie = req.cookies;

    if (!cookie) {
      throw new Error("cookie not found");
    }

    const { fcToken } = cookie;

    if (!fcToken) {
      throw new Error("token not found");
    }

    const jwtData = jwt.verify(fcToken, process.env.JWT_SECRET);

    if (!jwtData) {
      throw new Error("jsonwebtoken invalid or not found");
    }

    const user = await User.findById(jwtData.userId);

    if (!user) {
      throw new Error("user not found");
    }

    res.json({
      success: true,
      message: "user authentication successfull",
      data: { name: user.name, email: user.email, _id: user._id },
    });
  } catch (e) {
    next(e);
  }
};

export const logoutController = async (req, res, next) => {
  try {
    res.cookie("fcToken", null, { expires: new Date(Date.now()) });

    res.json({
      success: true,
      message: "logout successfull",
    });
  } catch (e) {
    next(e);
  }
};
