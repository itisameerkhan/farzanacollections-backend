import express from "express";
import {
  addProductController,
  getProductsController,
} from "../controllers/product.js";

const router = express.Router();

router.route("/add/new").post(addProductController);
router.route("/get/:category").get(getProductsController);

export default router;
