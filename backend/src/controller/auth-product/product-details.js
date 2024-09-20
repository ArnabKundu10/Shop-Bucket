const productModel = require("../../model/product");

const productDetails = async (req, res) => {
  try {
    const getProduct = await productModel.findById(req.params.id);
    res.status(201).json({
      data: getProduct,
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
module.exports = productDetails;
