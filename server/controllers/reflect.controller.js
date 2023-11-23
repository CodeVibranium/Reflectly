// const ReflectModel=require("")

const { BadRequestError } = require("../Errors/errors");
const ReflectModel = require("../models/reflect.model");
const UserModel = require("../models/user.model");
const { ApolloError } = require("@apollo/server");
const mongoose = require("mongoose");
const { ReflectValidator } = require("../validations/reflect.validations");
require("express-async-errors");
async function createAReflect(_root, data, context) {
  try {
    data = await ReflectValidator.validateAsync(data.input);
    if (data.authorId) {
      const isUserPresent = await UserModel.findById(data.authorId);
      if (!isUserPresent) throw new BadRequestError("User not found", context);
    }
    return await ReflectModel.create(data);
  } catch (error) {
    console.log(error, error.isJoi);
    if (error instanceof mongoose.Error.ValidationError)
      throw new BadRequestError(error.message, context);
    else if (error.isJoi) {
      throw new BadRequestError(error.message, context);
    }
  }
}
async function deleteAReflect(_root, data) {
  console.log("Data deleteAReflect", data);
  return null;
}

module.exports = { createAReflect, deleteAReflect };
