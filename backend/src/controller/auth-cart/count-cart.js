const cartSchema = require("../../model/cart-schema");

const itemCountCart = async (req, res) => {
  try {
    const userId = req.user;

    const count = await cartSchema.countDocuments({
      userId: userId,
    });

    res.json({
      count: count,
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

module.exports = itemCountCart;
