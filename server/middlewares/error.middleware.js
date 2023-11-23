function errorMiddleware(req, res, next, err) {
  console.log("error ===>", err);
  if (err.statusCode) {
    res.status(err.statusCode).send(err.message);
  } else {
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { errorMiddleware };
