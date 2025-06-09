import { Product } from "../models/product.js";

export const addProductController = async (req, res, next) => {
  try {
    const {
      imageURL,
      imageURL2,
      imageURL3,
      imageURL4,
      name,
      price,
      description,
      type,
      quantity,
      category,
    } = req.body;

    if (
      imageURL === "" ||
      imageURL2 === "" ||
      imageURL3 === "" ||
      imageURL4 === "" ||
      name === "" ||
      price === "" ||
      description === "" ||
      type === "" ||
      category === "" ||
      quantity === ""
    ) {
      throw new Error("All fields are required");
    }

    const product = new Product({
      imageURL,
      imageURL2,
      imageURL3,
      imageURL4,
      name,
      price,
      description,
      type,
      quantity,
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
