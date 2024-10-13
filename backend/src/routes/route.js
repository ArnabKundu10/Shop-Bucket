const express = require("express");
const multer = require("multer");
const path = require("path");
const register = require("../controller/auth-user/register");
const login = require("../controller/auth-user/login");
const productsupload = require("../controller/auth-product/productupload");
const addToCart = require("../controller/auth-cart/add-cart");
const requireSignIn = require("../middleware/middleware");
const itemCountCart = require("../controller/auth-cart/count-cart");
const itemViewCart = require("../controller/auth-cart/view-cart");
const itemDeleteCart = require("../controller/auth-cart/delete-cart");
const {
  incQuantity,
  decQuantity,
} = require("../controller/auth-cart/update-cart");
const allProducts = require("../controller/auth-product/allproducts");
const googleLogin = require("../controller/auth-user/googleLogin");
const imageUpload = require("../controller/auth-product/image-upload");
const customerDetails = require("../controller/auth-user/customerDetails");
const productDetails = require("../controller/auth-product/product-details");
const productFiltersController = require("../controller/auth-product/filter-product");
const cloudinary = require("../utils/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const route = express.Router();
// user setup
route.get("/google", googleLogin);
route.post("/register", register);
route.post("/login", login);
route.get("/customer/:id", customerDetails);

// product setup
route.get("/products", allProducts);
route.get("/product/:id", productDetails);
route.post("/product/filter", productFiltersController);

// cart setup
route.post("/add-to-cart", requireSignIn, addToCart);
route.get("/count-items", requireSignIn, itemCountCart);
route.get("/view-items", requireSignIn, itemViewCart);
route.post("/inc-item", requireSignIn, incQuantity);
route.post("/dec-item", requireSignIn, decQuantity);
route.post("/delete-item", requireSignIn, itemDeleteCart);

// AdminPanel
route.post("/products-upload", productsupload);
route.get("/users");
route.post("/role/:pos");
route.put("/update-user-details");
route.delete("/product-remove");
route.post("/product-update");

// image upload

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "src/uploads");
//   },
//   filename: (req, file, cb) => {
//     return cb(
//       null,
//       `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// const upload = multer({
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype == "image/png" ||
//       file.mimetype == "image/jpg" ||
//       file.mimetype == "image/jpeg" ||
//       file.mimetype == "image/webp"
//     ) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
//     }
//   },
//   storage: storage,
// });

// route.post("/image-upload", upload.single("product"), imageUpload);

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    public_id: (req, file) => file.originalname.split(".")[0] + "",
  },
});
const upload = multer({ storage: storage });

const imageupload = (req, res) => {
  try {
    console.log(req?.file);
    res.json({
      success: 1,
      image_url: req?.file?.path,
      // image_url: "img.jpg",
    });
  } catch (error) {
    res.json({
      success: 0,
      error: error,
    });
  }
};
route.post("/image-upload", upload.single("product"), imageupload);
module.exports = route;
