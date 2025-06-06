import express from "express";
import { loginController, logoutController, signupController, signupOtpController, userAuth } from "../controllers/user.js";

const router = express.Router();

router.route("/signup").post(signupController);
router.route("/signup/otp").post(signupOtpController);
router.route("/login").post(loginController);
router.route("/auth").get(userAuth);
router.route("/logout").get(logoutController);

export default router;