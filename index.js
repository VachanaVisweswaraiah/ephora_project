import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import storyRoutes from "./routes/story.route.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

// Middleware: Parse JSON, Cookies, and URL-encoded form data
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

// CORS configuration
const allowedOrigins = [
  "https://euphora-frontend.vercel.app",
  "https://euphora-frontend-j2dxs14ss-vachanas-projects.vercel.app",
  "https://euphora-frontend-vachanas-projects.vercel.app",
  "http://localhost:5173"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Required to send cookies in CORS
};

app.use(cors(corsOptions));

// Root route for health check
app.get("/", (req, res) => {
  res.send("✅ Euphora Backend is running.");
});

// Debug route for checking cookie/token presence
app.get("/debug/token", (req, res) => {
  res.json({
    cookies: req.cookies,
    token: req.cookies?.token || "❌ Token not found",
  });
});

// Mount API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);
app.use("/api/v1/story", storyRoutes);

// Start server
server.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server running on port ${PORT}`);
});
