const express = require("express");
const app = express();
const db = require("./mysql_config");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const likeRoutes = require("./routes/like");
const commentRoutes = require("./routes/comment");
const path = require("path");
const { dirname } = require("path");

//getting the body of the request
app.use(express.json());
//declaring headers so API communication works
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/post/like", likeRoutes);
app.use("/api/post/comment", commentRoutes);
module.exports = app;
