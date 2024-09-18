const cartSchema = require("../../model/cart-schema");

const addToCart = async (req, res) => {
  try {
    const { productId } = req?.body;
    const userId = req.user;
    console.log(userId);
    const isProductAvailable = await cartSchema.find({ userId, productId });

    console.log("isProductAvailable   ", isProductAvailable.length);

    if (isProductAvailable.length > 0) {
      return res.json({
        message: "Already exits in Add to cart",
        success: false,
        error: true,
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: userId,
    };

    const newAddToCart = new cartSchema(payload);
    const saveProduct = await newAddToCart.save();

    return res.json({
      data: saveProduct,
      message: "Product Added in Cart",
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
module.exports = addToCart;
