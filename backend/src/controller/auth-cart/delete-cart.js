const cartSchema = require("../../model/cart-schema");

const itemDeleteCart = async (req, res) => {
  try {
    const userId = req?.user;
    const { productId } = req.body;
    const deleteProduct = await cartSchema.findOneAndDelete({
      userId,
      productId,
    });
    const items = await cartSchema
      .find({
        userId: userId,
      })
      .populate("productId");
    let price1 = 0;
    let price2 = 0;
    for (let index = 0; index < items.length; index++) {
      price1 += items[index]?.productId?.price * items[index]?.quantity;
      price2 += items[index]?.productId?.sellingPrice * items[index]?.quantity;
    }
    res.status(201).json({
      tp: price1,
      sp: price2,
      data: items,
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
