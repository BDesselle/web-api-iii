const express = require("express");
const router = express.Router();
const posts = require("./postDb");

router.get("/", (req, res) => {});

router.get("/:id", validatePostId, (req, res) => {});

router.delete("/:id", validatePostId, (req, res) => {});

router.put("/:id", validatePostId, (req, res) => {});

//* custom VALIDATE middleware
function validatePostId(req, res, next) {
  try {
    posts.getById(req.params.id).then(response => {
      response ? next() : res.status(404).json({ message: "invalid user id" });
    });
  } catch (err) {
    res.status(500).json({ error: "Could not validate post id" });
  }
}

module.exports = router;
