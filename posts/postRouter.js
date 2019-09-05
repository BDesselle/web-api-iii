const express = require("express");
const router = express.Router();
const posts = require("./postDb");

//* READ ALL POSTS
router.get("/", (req, res) => {});
//* READ POSTS BY ID
router.get("/:id", validatePostId, (req, res) => {});
//* UPDATE POST BY ID
router.put("/:id", validatePostId, (req, res) => {});
//* DELETE POST BY ID
router.delete("/:id", validatePostId, (req, res) => {});

//* custom VALIDATE middleware
function validatePostId(req, res, next) {}

module.exports = router;
