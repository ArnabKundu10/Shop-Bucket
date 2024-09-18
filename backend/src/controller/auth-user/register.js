const UserSchema = require("../../model/user");
// const bcryptjs = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const googleLogin = async (req, res) => {
  try {
    const newdata = new UserSchema({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const token = await newdata.generateAuthToken();
    console.log(`my token is${token}`);
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 6000000),
      httpOnly: true,
    });
    const registerData = await newdata.save();
    console.log(registerData);
    res.status(201).send({
      msg: "Registration Successful",
      token: `${token}`,
      user: registerData,
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Internal server error",
      error: err.message,
    });
  }
};

module.exports = googleLogin;
