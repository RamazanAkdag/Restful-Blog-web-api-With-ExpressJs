const fs = require("fs");
const path = require("path");

// Kullanıcıları içeren db.json dosya yolu
const dbPath = path.join(__dirname, "..", "db.json");

class Post {
  constructor(title, content, authorId, category) {
    this.id = 0;
    this.title = title;
    this.content = content;
    this.authorId = authorId;
    this.category = category;
    this.comments = [];
  }

  save() {
    const db = fs.readFileSync(dbPath, "utf-8");
    const dbData = JSON.parse(db);

    const posts = this.constructor.getAllPosts();
    this.id = dbData.maxPostId + 1;
    dbData.maxPostId = this.id;
    posts.push(this);
    dbData.posts = posts;

    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2));
  }

  static getAllPosts() {
    const dbContent = fs.readFileSync(dbPath, "utf-8");
    const data = JSON.parse(dbContent);
    //console.log(data.users);
    return data.posts || [];
  }
}

module.exports = Post;
