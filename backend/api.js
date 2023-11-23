const express = require("express");
const router = express.Router();

// Import all routes
const usersRoutes = require("./routes/users");
const itemsRoutes = require("./routes/items");
const commentRoutes = require("./routes/comments");

// Use routes
router.use("/users", usersRoutes); //means http.../users and so on for others
router.use("/items", itemsRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
