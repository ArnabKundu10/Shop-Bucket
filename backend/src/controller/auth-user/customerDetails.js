const UserSchema = require("../../model/user");

const customerDetails = async (req, res) => {
  try {
    const _id = req.params.id;
    const customer = await UserSchema.findById(_id);
    console.log(customer);
    res.status(201).send({
      user: customer,
    });
  } catch (error) {
    console.log("ONE");

    res.status(500).send(error);
  }
};
module.exports = customerDetails;
