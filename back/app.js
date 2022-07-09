const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/sauce");
const likeRoutes = require("./routes/like");
const path = require("path");
const { dirname } = require("path");

//connecting to database
// const USER_NAME = process.env.USER_NAME;
// const PASSWORD_MONGO = process.env.PASSWORD_MONGO;
// const CLUSTER = process.env.CLUSTER;
// const DATABASE = process.env.DATABASE;
// mongoose
//   .connect(
//     `mongodb+srv://${USER_NAME}:${PASSWORD_MONGO}@${CLUSTER}.2texb.mongodb.net/${DATABASE}?retryWrites=true&w=majority`,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => console.log("Connection successful"))
//   .catch(() => console.log("connection failed"));
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
