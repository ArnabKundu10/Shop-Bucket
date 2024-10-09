const url =
  process.env.NODE_ENV === "development"
    ? process.env.URL_LOCAL
    : process.env.URL_REMOTE;
const imageUpload = (req, res) => {
  try {
    const imageURL = `${url}/images/${req.file.filename}`;
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
