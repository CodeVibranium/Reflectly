const { UnAuthorizedError } = require("../Errors/errors");
const { handleAPIError } = require("../helpers/helper");
const UserModel = require("../models/user.model");
const { CreateUserValidation } = require("../validations/user.validation");

async function createAUser(_root, data, context) {
  try {
    data = await CreateUserValidation.validateAsync(data.userInput);
    //   const isUserNameTaken = await UserModel.findOne({ name });
    //   if(isUserNameTaken) throw new UnAuthorizedError("This is username is taken")
    return await UserModel.create(data);
  } catch (error) {
    handleAPIError(error, context);
  }
}

async function getUserDetails(_root, data, context) {
  let user = await UserModel.findById(data.userId);
  console.log("user==>", user);
  return user;
}
module.exports = { createAUser, getUserDetails };
