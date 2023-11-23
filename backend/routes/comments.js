const express = require("express");
const router = express.Router();
const db = require("../models/db");

// Get all comments
// router.get("/", (req, res) => {
//   const selectAllComments = "SELECT * FROM comments";

//   db.all(selectAllComments, (err, rows) => {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }

//     res.json({ comments: rows });
//   });
// });
router.get("/", (req, res) => {
  const selectAllComments = `
    SELECT comments.*, items.title AS item_title, users.username, users.id AS user_id, items.description AS item_description
    FROM comments
    JOIN users ON comments.user_id = users.id
    JOIN items ON comments.item_id = items.id
  `;

  db.all(selectAllComments, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ comments: rows });
  });
});
// Create a new comment
router.post("/new", (req, res) => {
  const { user_id, item_id, description } = req.body;

  if (!user_id || !item_id || !description) {
    return res
      .status(400)
      .json({ error: "user_id, item_id, and description are required" });
  }

  const insertComment =
    "INSERT INTO comments (user_id, item_id, description) VALUES (?, ?, ?)";
  db.run(insertComment, [user_id, item_id, description], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ commentId: this.lastID });
  });
});

// Get a specific comment by ID
router.get("/:id", (req, res) => {
  const commentId = req.params.id;
  const selectCommentById = "SELECT * FROM comments WHERE id = ?";

  db.get(selectCommentById, [commentId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!row) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json({ comment: row });
  });
});

// Update a comment
router.put("/:id", (req, res) => {
  const commentId = req.params.id;
  const { user_id, item_id, description } = req.body;

  if (!user_id || !item_id || !description) {
    return res
      .status(400)
      .json({ error: "user_id, item_id, and description are required" });
  }

  const updateComment =
    "UPDATE comments SET user_id = ?, item_id = ?, description = ? WHERE id = ?";
  db.run(
    updateComment,
    [user_id, item_id, description, commentId],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: "Comment not found" });
      }

      res.json({ message: "Comment updated successfully" });
    }
  );
});

// Delete a comment
router.delete("/:id", (req, res) => {
  const commentId = req.params.id;
  const deleteComment = "DELETE FROM comments WHERE id = ?";

  db.run(deleteComment, [commentId], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json({ message: "Comment deleted successfully" });
  });
});

module.exports = router;
