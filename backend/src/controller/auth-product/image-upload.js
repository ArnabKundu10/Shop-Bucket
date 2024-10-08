// require("dotenv").config();
// const apiUrl = process.env.URL_REMOTE;
const imageUpload = (req, res) => {
  try {
    const imageURL = `https://shop-bucket-99xb.vercel.app/images/${req.file.filename}`;
    console.log(imageURL);
    res.json({
      success: 1,
      image_url: imageURL,
    });
  } catch (error) {
    res.json({
      success: 0,
      error: error,
    });
  }
};

module.exports = imageUpload;
