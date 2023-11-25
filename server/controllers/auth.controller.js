const { BadRequestError } = require("../Errors/errors");
const { handleAPIError } = require("../helpers/helper");
const UserModel = require("../models/user.model");
const { LoginValidation } = require("../validations/auth.validation");

async function login(_root, data, context) {
  try {
    data = await LoginValidation.validateAsync(data.loginInput);
    let user;
    if (data.name) {
      user = await UserModel.findOne({ name: data.name });
    } else user = await UserModel.findOne({ email: data.email });
    if (!user) throw new BadRequestError("Some details are incorrect!");
    if (!(await user.comparePassword(data.password)))
      throw new BadRequestError("Some details are incorrect!");
    return user;
  } catch (error) {
    handleAPIError(error, context);
  }
}

module.exports = { login };
