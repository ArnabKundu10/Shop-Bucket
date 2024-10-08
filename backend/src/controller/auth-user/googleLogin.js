const UserSchema = require("../../model/user");
const { oauth2client } = require("../../utils/googleConfig");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const googleLogin = async (req, res) => {
  try {
    const { code } = req.query;

    const googleRes = await oauth2client.getToken(code);
    // console.log(googleRes);
    oauth2client.setCredentials(googleRes.tokens);
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );
    // console.log(userRes);
    const { email, name, picture } = userRes.data;
    let user = await UserSchema.findOne({ email });
    if (!user) {
      const UserDetails = new UserSchema({
        email: email,
        name: name,
        password: "ArnabKundu12@",
      });
      user = await UserDetails.save();
    }
    const token = await user.generateAuthToken();
    // console.log(`my token is${token}`);
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 6000000),
      httpOnly: true,
    });
    // console.log(user);
    res.status(201).send({
      msg: "Registration Successful",
      token: token,
      user: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: "Internal server error",
      error: err.message,
    });
  }
};

module.exports = googleLogin;
