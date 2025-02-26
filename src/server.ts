import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db";
import routes from "./routes";

dotenv.config();
const app = express();

// Database Connection
connectDB();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Default Route
app.get("/", (req, res) => {
  res.send("🚀 Server is running!");
});

// API Routes
app.use("/", routes); // Added "/api" as a prefix for clarity

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
