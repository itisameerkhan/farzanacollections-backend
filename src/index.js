import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "../config/connectDB.js";
import userRouter from "../routers/userRouter.js";
import { errorHandler } from "../config/errorHandler.js";
import productRouter from "../routers/product.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
dotenv.config();

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("server is listening to PORT ", process.env.PORT);
  });
});

app.use("/user", userRouter);
app.use("/product", productRouter);

app.use(errorHandler);
