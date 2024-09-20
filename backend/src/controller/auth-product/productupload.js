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
      price: Number(price),
      sellingPrice: Number(sellingPrice),
    });
    const prod = await newProduct.save();
    console.log(prod);
    res.status(201).send(prod);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
module.exports = productsupload;
