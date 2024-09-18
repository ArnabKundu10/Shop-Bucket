const cartSchema = require("../../model/cart-schema");

const itemDeleteCart = async (req, res) => {
  try {
    const userId = req?.user;
    const { productId } = req.body;
    const deleteProduct = await cartSchema.findOneAndDelete({
      userId,
      productId,
    });
    res.status(201).json({
      data: deleteProduct,
      error: false,
      success: true,
      msg: "item is deleted",
    });
  } catch (error) {
    res.status(404).json({
      error: true,
      success: false,
      msg: "there is some error",
    });
  }
};

module.exports = itemDeleteCart;
