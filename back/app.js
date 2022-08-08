const express = require("express");
const app = express();
const db = require("./mysql_config");
// const userRoutes = require("./routes/user");
// const productRoutes = require("./routes/sauce");
// const likeRoutes = require("./routes/like");
// const path = require("path");
// const { dirname } = require("path");

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
// app.use("/images", express.static(path.join(__dirname, "images")));
// app.use("/api/auth", userRoutes);
// app.use("/api/sauces", productRoutes);
// app.use("/api/sauces", likeRoutes);
module.exports = app;
