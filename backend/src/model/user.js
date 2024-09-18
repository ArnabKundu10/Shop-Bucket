const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      uppercase:true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    password: String,
    role: {
      type: String,
      default: "GENERAL",
    },
  },
  {
    timestamps: true,
  }
);
userSchema.methods.generateAuthToken = async function () {
  try {
    const myToken = await jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_KEY
    );
    console.log("here is my token", myToken);
    return myToken;
  } catch (error) {
    console.log(error);
  }
};
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  console.log(`new password is ${this.password}`);
  next();
});
module.exports = mongoose.model("User", userSchema);
