import Product from "../models/Products.js";
import ProductStat from "../models/ProductsStat.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    // const productsWithStats = await Promise.all(
    //     products.map(async (product) => {

    //     })
    // )
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
