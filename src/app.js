const express = require("express");
require("dotenv").config();

const app = express();
const port = Number(process.env.PORT || 5000);

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "node-backend",
    environment: process.env.NODE_ENV || "development",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

app.listen(port, () => {
  console.log(
    `Server running on port ${port} in ${process.env.NODE_ENV || "development"} mode.`
  );
});
