const UserSchema = require("../../model/user");
const bcryptjs = require("bcryptjs");
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await UserSchema.findOne({ email: email });
    if (findUser) {
      const passwordMatch = await bcryptjs.compare(password, findUser.password);
      // console.log(`check compare with ${findUser.password}`);
      if (passwordMatch) {
        const token = await findUser.generateAuthToken();
        res.status(201).send({
          msg: "Login Successful",
          token: `${token}`,
          user: findUser,
        });
      } else {
        res.status(500).send("error in password");
      }
    } else {
      res.status(500).send("error in details");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg: "Internal server error!",
      error: error.message,
    });
  }
};

module.exports = login;
