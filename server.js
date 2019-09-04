const express = require("express");
const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");
const server = express();

server.use(express.json(), logger);

/* server.use(logger); */

// Post Router
server.use("/api/posts", postRouter);

// User Router
server.use("/api/users", userRouter);

//* custom LOGGER middleware
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      "Origin"
    )}`
  );
  next();
}

module.exports = server;
