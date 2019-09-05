const express = require("express");
const router = express.Router();
const users = require("./userDb");
const posts = require("../posts/postDb");

//* CREATE USER
router.post("/", validateUser, (req, res) => {
  users
    .insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(() => {
      res
        .status(500)
        .json({ Error: "There was an issue adding the user to the database" });
    });
});
//* CREATE POST
router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  req.body = { ...req.body, user_id: req.user.id };
  posts
    .insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(() => {
      res
        .status(500)
        .json({ Error: "There was an issue adding the post to the database" });
    });
});
//* READ ALL USERS
router.get("/", (req, res) => {
  users
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(() => {
      res
        .status(500)
        .json({ Error: "Internal server error while trying to request users" });
    });
});
//* READ USER BY ID
router.get("/:id", validateUserId, (req, res) => {
  users
    .getById(req.user.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(() => {
      res
        .status(500)
        .json({ Error: "there was an error getting the user from the server" });
    });
});
//* READ USER'S POSTS BY ID
router.get("/:id/posts", validateUserId, (req, res) => {
  users
    .getUserPosts(req.user.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(500).json({
        Error:
          "there was an issue retriveing the posts for that user from the server"
      });
    });
});
//* UPDATE USER BY ID
router.put("/:id", validateUserId, validateUser, (req, res) => {
  users
    .update(req.user.id, req.body)
    .then(num => {
      if (num == 1) {
        res.status(200).json({ message: "the user was updated succesfully" });
      } else {
        res
          .status(500)
          .json({ message: "There was an error updateing the user" });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "There was an error updateing the user" });
    });
});
//* DELETE USER BY ID
router.delete("/:id", validateUserId, (req, res) => {
  users
    .remove(req.user.id)
    .then(num => {
      res.status(200).json({ Items_deleted: num });
    })
    .catch(() => {
      res.status(500).json({ Error: "there was an error deleteing the user" });
    });
});

//* CUSTOM MIDDLEWARE
function validateUserId(req, res, next) {
  users.getById(req.params.id).then(userWithId => {
    if (userWithId == undefined) {
      res.status(400).json({ message: "invalid user id" });
    } else {
      req.user = userWithId;
      next();
    }
  });
}

function validateUser(req, res, next) {
  if (Object.keys(req.body).length == 0) {
    res.status(400).json({ message: "missing user data" });
  } else if (req.body.name == null) {
    res.status(400).json({ message: "missing required name field" });
  }
  next();
}

function validatePost(req, res, next) {
  if (Object.keys(req.body).length == 0) {
    res.status(400).json({ message: "missing post data" });
  } else if (req.body.text == null) {
    res.status(400).json({ message: "missing required text field" });
  }
  next();
}

module.exports = router;
