const Post = require("../../models/post");

const createPostController = (req, res) => {
  const user = req.session.user;
  console.log(user);

  const { title, content, category } = req.body;

  const authorId = user.id;
  const newPost = new Post(title, content, authorId, category);

  newPost.save();
  return res.status(200).json({ message: "Post oluşturuldu.", newPost });
};

const getPostsController = (req, res) => {
  const posts = Post.getAllPosts();

  res.status(200).json({
    success: true,
    posts: posts,
  });
};

const getPostFromId = (req, res) => {
  const posts = Post.getAllPosts();
  const postId = req.params.id;

  const post = posts.find((post) => post.id == postId);
  if (!post) {
    return res.status(400).json({
      success: false,
      message: "verilen kimliğe sahip bir post bulunamadı",
    });
  }

  res.status(200).json({
    success: true,
    post: post,
  });
};

const fs = require("fs");
const addCommentController = (req, res) => {
  const data = fs.readFileSync("db.json", "utf8");

  // JSON verisini parçalayın
  const jsonData = JSON.parse(data);
  const postId = req.params.id;
  const newComment = {
    id: jsonData.maxCommentId + 1, // Yeni yorumun id'si
    postId: postId, // İlgili postun id'si
    authorId: req.session.user.id,
    content: req.body.content,
  };
  jsonData.maxCommentId = newComment.id;

  // İlgili postu güncelleyin

  const posts = Post.getAllPosts();

  const post = posts.find((post) => post.id == postId);
  post.comments.push(newComment);
  jsonData.posts = posts;

  // Güncellenmiş veriyi tekrar JSON formatına dönüştürün
  const updatedData = JSON.stringify(jsonData, null, 2);

  // db.json dosyasını güncelleyin
  fs.writeFileSync("db.json", updatedData, "utf8");

  res.status(200).json({
    success: true,
    post,
  });
};
module.exports = {
  createPostController,
  getPostsController,
  getPostFromId,
  addCommentController,
};
