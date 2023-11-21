require("dotenv").configDotenv({ path: "./.env" });
require("express-async-errors");

const cors = require("cors");
const helmet = require("helmet");
const express = require("express");
const rateLimiter = require("express-rate-limit");
const { connectToDb } = require("./db/connection");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      if (process.env.ALLOWED_HOSTS?.indexOf(origin) !== -1 || !origin)
        callback(null, true);
      else callback(new Error("Not allowed by CORS"));
    },
  })
);

app.use(helmet());

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
  })
);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is listening on port:", PORT);
  connectToDb();
});
