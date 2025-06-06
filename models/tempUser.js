import mongoose from "mongoose";

const tempUserModel = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
});

export const TempUser = mongoose.model("TempUser", tempUserModel);
