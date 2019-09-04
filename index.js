const server = require("./server");
const port = 6000;

server.get("/", (req, res) => {
  res.send("Let's write some middleware!");
});

// 404 Fallback
server.use(function(req, res) {
  res.status(404).send("😿 RIP this endpoint 😿");
});

server.listen(port, () => console.log(`API on port ${port}...`));
