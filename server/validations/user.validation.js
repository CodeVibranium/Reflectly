const Joi = require("joi");

const CreateUserValidation = Joi.object({
  name: Joi.string().min(2).max(60).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20).required(),
});

module.exports = { CreateUserValidation };
