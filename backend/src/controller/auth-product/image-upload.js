const apiUrl = process.env.URL_REMOTE;
const imageUpload = (req, res) => {
  try {
    const imageURL = `${apiUrl}/images/${req.file.filename}`;
    console.log(imageURL);
    res.json({
      success: 1,
      image_url: imageURL,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = imageUpload;
