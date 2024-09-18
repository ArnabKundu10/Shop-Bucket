const productModel = require("../../model/product");

const productsupload = async (req, res) => {
  try {
    const {
      productName,
      brandName,
      category,
      description,
      productImage,
      price,
      sellingPrice,
    } = req.body;
    const newProduct = new productModel({
      productName: productName,
      brandName: brandName,
      category: category,
      productImage: productImage,
      description: description,
      price: price,
      sellingPrice: sellingPrice,
    });
    const prod = await newProduct.save();
    console.log(prod);
    res.send(prod);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
module.exports = productsupload;
