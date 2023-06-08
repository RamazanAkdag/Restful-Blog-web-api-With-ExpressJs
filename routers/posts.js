const express = require("express");
const { requireLogin } = require("./controllers/auth");
const {
  createPostController,
  getPostsController,
  getPostFromId,
  addCommentController,
} = require("./controllers/posts");
const router = express.Router();

router.post("/", requireLogin, createPostController);

router.get("/", requireLogin, getPostsController);

router.get("/:id", requireLogin, getPostFromId);

router.post("/:id/comments", requireLogin, addCommentController);

module.exports = router;
