const path = require("path");

// Import the dotenv package
require("dotenv").config({
  // Configure dotenv with a path to the .env file based on the current working directory and NODE_ENV
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
});

const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;
const cors = require("cors");
const mongoose = require("mongoose");

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(
  cors({
    origin: "*",
  })
);

const privateKey = process.env.PRIVATE_KEY;

// Middleware to parse JSON request body
app.use(express.json());

// Endpoint for verifying JWT token
app.post("/api/verify", async (req, res) => {
  const { ssoToken } = req.body;
  const user = jwt.verify(ssoToken, privateKey);
  console.log(user);
  res.json(user);
});

app.listen(port, () => {
  console.log(`Server is running at http://45.136.70.229/${port}`);
});

// Middleware for logging request path and method
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes for handling posts
const postRoutes = require("./routes/posts");
app.use("/api/posts", postRoutes);

// Connect to the MongoDB database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Start the server after successful database connection
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to the database & server running on port ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });

// Error-handling middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke");
});