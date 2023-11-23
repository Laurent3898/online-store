const express = require("express");
const router = express.Router();
const db = require("../models/db");

// GET all items
router.get("/", (req, res) => {
  db.all("SELECT * FROM items", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ items: rows });
  });
});

// GET a specific items by ID
router.get("/:id", (req, res) => {
  const itemsId = req.params.id;
  db.get("SELECT * FROM items WHERE id = ?", [itemsId], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: "Items not found" });
      return;
    }
    res.json({ items: row });
  });
});

// POST a new items
router.post("/new", (req, res) => {
  const { title, price, description } = req.body;
  if (!title || !price || !description) {
    res.status(400).json({
      error: "Title, price and description should not be null or empty",
    });
    return;
  }
  db.run(
    "INSERT INTO items (title,price, description) VALUES (?, ?, ?)",
    [title, price, description],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ itemsId: this.lastID });
    }
  );
});

//Update items
router.put("/:id", (req, res) => {
  const itemsId = req.params.id;
  const { title, price, description } = req.body;

  if (!title || !price || !description) {
    res
      .status(400)
      .json({ error: "Title, price and description are required" });
    return;
  }

  db.run(
    "UPDATE items SET title = ?, price?, description = ? WHERE id = ?",
    [title, price, description, itemsId],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      if (this.changes === 0) {
        res.status(404).json({ error: "Items not found" });
        return;
      }

      res.json({ message: "Items updated successfully" });
    }
  );
});

//Delete items
router.delete("/:id", (req, res) => {
  const itemsId = req.params.id;

  db.run("DELETE FROM items WHERE id = ?", [itemsId], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (this.changes === 0) {
      res.status(404).json({ error: "Items not found" });
      return;
    }

    res.json({ message: "Items deleted successfully" });
  });
});

module.exports = router;
