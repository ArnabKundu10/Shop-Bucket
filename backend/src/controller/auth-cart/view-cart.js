const cartSchema = require("../../model/cart-schema");
// const productModel = require("../../model/product");
const itemViewCart = async (req, res) => {
  try {
    const userId = req.user;

    const items = await cartSchema
      .find({
        userId: userId,
      })
      .populate("productId");
    // const products=[];
    // items.map
    console.log(items);
    res.json({
      data: items,
      message: "ok",
      error: false,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: false,
      success: false,
    });
  }
};

module.exports = itemViewCart;
