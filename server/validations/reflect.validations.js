const Joi = require("joi");

const ReflectValidator = Joi.object({
  reflect: Joi.string().min(1).max(300).required(),
  isPublic: Joi.boolean().required(),
  isAnonymous: Joi.boolean().required(),
  password: Joi.string().min(8).when("isPublic", {
    is: false,
    then: Joi.required(),
  }),
  author: Joi.string().when("isAnonymous", {
    is: false,
    then: Joi.required(),
  }),
});

module.exports = { ReflectValidator };
