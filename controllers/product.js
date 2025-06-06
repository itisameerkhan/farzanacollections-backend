import { Product } from "../models/product.js";

export const addProductController = async (req, res, next) => {
  try {
    const { imageURL, name, price, description, type, category } = req.body;

    if (
      imageURL === "" ||
      name === "" ||
      price === "" ||
      description === "" ||
      type === "" ||
      category === ""
    ) {
      throw new Error("All fields are required");
    }

    const product = new Product({
      imageURL,
      name,
      price,
      description,
      type,
      category,
    });

    await product.save();

    res.json({
      success: true,
      message: "product created successfully",
    });
  } catch (e) {
    next(e);
  }
};

export const getProductsController = async (req, res, next) => {
  try {
    const { category } = req.params;

    const products = await Product.find({ category: category });

    res.json({
      success: true,
      message: "data fetched successfully",
      data: products,
    });
  } catch (e) {
    next(e);
  }
};
