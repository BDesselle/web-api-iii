const express = require("express");
const server = express();
const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");

server.use(express.json());

//* custom LOGGER middleware
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.ip}`
  );
  next();
}

// Logger Middleware
server.use(logger);

// Post Router
server.use("/api/posts", postRouter);

// User Router
server.use("/api/users", userRouter);

// Welcome
server.get("/", (req, res) => {
  res.send("Let's write some middleware!");
});

// 404 Fallback
server.use(function(req, res) {
  res.status(404).send("😿 RIP this endpoint 😿");
});

module.exports = server;
