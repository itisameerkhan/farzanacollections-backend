import mongoose from "mongoose";

const productModel = mongoose.Schema({
  imageURL: {
    type: String,
    required: true,
  },
  imageURL2: {
    type: String,
    required: true,
  },
  imageURL3: {
    type: String,
    required: true,
  },
  imageURL4: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    requird: true,
  },
});

export const Product = mongoose.model("Product", productModel);
