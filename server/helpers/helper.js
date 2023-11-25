const {
  BadRequestError,
  UnAuthenticatedError,
  UnAuthorizedError,
  NotFoundError,
} = require("../Errors/errors");
const mongoose = require("mongoose");

function handleAPIError(error, context) {
  if (error instanceof mongoose.Error.ValidationError)
    throw new BadRequestError(error.message, context);
  else if (error.isJoi) {
    throw new BadRequestError(error.message, context);
  } else if (error?.code === 11000) {
    error.message = `Duplicate value entered for ${Object.keys(
      error.keyValue
    )} field, please choose another value`;
    throw new BadRequestError(error.message, context);
  } else if (error instanceof BadRequestError) {
    throw new BadRequestError(error.message, context);
  } else if (error instanceof UnAuthenticatedError) {
    throw new UnAuthenticatedError(error.message, context);
  } else if (error instanceof UnAuthorizedError)
    throw new UnAuthorizedError(error.message, context);
  else if (error instanceof NotFoundError)
    throw new NotFoundError(error.message, context);
}

module.exports = { handleAPIError };
