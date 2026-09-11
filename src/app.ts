import express from "express";
import userRoutes from './modules/users/user.routes'
import authRoutes from './modules/auth/auth.routes'
import { errorHandler } from "./shared/middlewares/error-handler.middleware";

const app = express();

app.use(express.json());

app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "node-backend",
    environment: process.env.NODE_ENV || "development",
  });
});

app.get("/api/v1", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running successfully",
  });
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

app.use(errorHandler)

export default app;
