import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db";
import routes from "./routes";
import { Request, Response } from "express";

dotenv.config();
const app = express();

// Database Connection
connectDB();

// Middleware
app.use(cors({ origin:"https://laserxacad.vercel.app", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Default Route

app.get("/", (req: Request, res: Response) => {
  console.log("🚀 Server received a request!");
  res.send("🚀 Server is running!");
});

// API Routes
app.use("/", routes);

// Start Server (if NOT deploying to Vercel)
if (process.env.NODE_ENV !== "vercel") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}

// Export for Vercel
export default app;
