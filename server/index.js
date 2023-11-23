require("dotenv").configDotenv({ path: "./.env" });
require("express-async-errors");
const cors = require("cors");
const helmet = require("helmet");
const express = require("express");
const rateLimiter = require("express-rate-limit");
const { connectToDb } = require("./db/connection");
const { expressMiddleware } = require("@apollo/server/express4");
const apolloServer = require("./graphql/apollo.server");
const { errorMiddleware } = require("./middlewares/error.middleware");

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

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        imgSrc: [
          `'self'`,
          "data:",
          "apollo-server-landing-page.cdn.apollographql.com",
        ],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        manifestSrc: [
          `'self'`,
          "apollo-server-landing-page.cdn.apollographql.com",
        ],
        frameSrc: [`'self'`, "sandbox.embed.apollographql.com"],
      },
    },
  })
);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
  })
);

const PORT = process.env.PORT;

apolloServer().then(async (server) => {
  await server.start();
  app.use(
    "/graphql/",
    expressMiddleware(server, { context: ({ req, res }) => ({ req, res }) })
  );
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("Server is listening on port:", PORT);
  connectToDb();
  console.log(`GRAPHQL is running at: http://localhost:${PORT}/graphql/`);
});
