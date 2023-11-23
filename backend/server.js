const express = require("express");
const cors = require("cors");
const app = express();

// Enable CORS for all routes can access
app.use(cors());

// Import routes
const apiRoutes = require("./api");

// Include middleware
app.use(express.json());

// Use routes
app.use("/api", apiRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
