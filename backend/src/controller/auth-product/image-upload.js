const imageUpload = (req, res) => {
  const imageURL = `http://localhost:3000/images/${req.file.filename}`;
  console.log(imageURL);
  res.json({
    success: 1,
    image_url: imageURL,
  });
};

module.exports = imageUpload;
