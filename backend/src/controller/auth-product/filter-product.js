const productModel = require("../../model/product");
const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    // productCategory: { $in: categories }
    if (checked.length > 0) args.category = { $in: checked };
    // console.log("checked:", checked, "radio:", radio);
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    args.productImage = { $ne: "" };
    let products = null;
    if (!args) products = await productModel.find({ args });
    else products = await productModel.find(args).sort({ createdAt: -1 });
    // console.log(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};
module.exports = productFiltersController;
