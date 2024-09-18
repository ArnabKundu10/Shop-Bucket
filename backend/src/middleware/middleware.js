const JWT = require("jsonwebtoken");

const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.SECRET_KEY
    );
    req.user = decode;
    console.log(req.user);
    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = requireSignIn;
