const cartSchema = require("../../model/cart-schema");

const incQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user;
    let qty = quantity + 1;
    const item = await cartSchema.updateOne(
      { userId, productId },
      { $set: { quantity: qty } }
    );
    res.json({
      data: item,
      quantity: qty,
      success: true,
      error: false,
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};
const decQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user;
    let qty = quantity;
    if (qty !== 1) {
      qty = qty - 1;
    }
    const item = await cartSchema.updateOne(
      { userId, productId },
      { $set: { quantity: qty } }
    );
    res.json({
      data: item,
      quantity: qty,
      success: true,
      error: false,
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};
module.exports = { incQuantity, decQuantity };
