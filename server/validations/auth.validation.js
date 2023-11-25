const Joi = require("joi");

const LoginValidation = Joi.object({
  name: Joi.string(),
  password: Joi.string().required(),
  email: Joi.string().email(),
}).xor("name", "email"); // This enforces that either name or email must be present, but not both or neither.

module.exports = { LoginValidation };
