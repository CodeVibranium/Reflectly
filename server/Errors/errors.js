const { GraphQLError } = require("graphql");

class BadRequestError extends GraphQLError {
  constructor(message, context, code = "BAD_REQUEST") {
    super(message);
    this.message = message;
    this.extensions = {
      ...this.extensions,
      statusCode: 400,
      code,
      context,
    };
  }
}

class NotFoundError extends GraphQLError {
  constructor(message, context, code = "NOT_FOUND") {
    super(message);
    this.message = message;
    this.extensions = {
      ...this.extensions,
      statusCode: 404,
      code: code,
    };
    this.context = context;
  }
}
class UnAuthenticatedError extends GraphQLError {
  constructor(message, context, code = "UNAUTHENTICATED") {
    super(message);
    this.message = message;
    this.extensions = {
      ...this.extensions,
      statusCode: 401,
      code: code,
    };
    this.context = context;
  }
}

class UnAuthorizedError extends GraphQLError {
  constructor(message, context, code = "UNAUTHORIZED") {
    super(message);
    this.message = message;
    this.extensions = {
      ...this.extensions,
      statusCode: 403,
      code: code,
    };
    this.context = context;
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
  UnAuthorizedError,
};
