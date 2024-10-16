const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://shop-bucket.vercel.app";
const imageUpload = (req, res) => {
  try {
    const imageURL = `${url}/images/${req.file.filename}`;
    console.log(req.file);
    res.json({
      success: 1,
      image_url: imageURL,
    });
  } catch (error) {
    console.log("error here");
    res.json({
      success: 0,
      error: error,
    });
  }
};

module.exports = imageUpload;
