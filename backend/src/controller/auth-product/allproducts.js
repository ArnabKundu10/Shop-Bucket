const productModel = require("../../model/product");

const allProducts = async (req, res) => {
  try {
    const getProducts = await productModel.find({});
    res.status(201).json({
      data: getProducts,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(404).json({
      message: error?.message || err,
      success: true,
      error: false,
    });
  }
};
module.exports = allProducts;
