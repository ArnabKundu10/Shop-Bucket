const apiUrl =
  window.location.hostname === "localhost"
    ? process.env.URL_LOCAL
    : process.env.URL_REMOTE;
const imageUpload = (req, res) => {
  const imageURL = `${apiUrl}/images/${req.file.filename}`;
  // console.log(imageURL);
  res.json({
    success: 1,
    image_url: imageURL,
  });
};

module.exports = imageUpload;
