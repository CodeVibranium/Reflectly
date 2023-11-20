class BadRequestError extends Error {
  constructor(message, code) {
    super(message);
    this.statusCode = 400;
    this.code = code || "BAD_REQUEST";
  }
}

class NotFoundError extends Error {
  constructor(message, code) {
    super(message);
    this.statusCode = 404;
    this.code = code || "NOT_FOUND";
  }
}
class UnAuthenticatedError extends Error {
  constructor(message, code) {
    super(message);
    this.statusCode = 401;
    this.code = code || "UNAUTHENTICATED";
  }
}

class UnAuthorizedError extends Error {
  constructor(message, code) {
    super(message);
    this.statusCode = 403;
    this.code = code || "UNAUTHORIZED";
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
  UnAuthorizedError,
};
