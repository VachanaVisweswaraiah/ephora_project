import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./socket/socket.js";
import storyRoutes from './routes/story.route.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Parse incoming data
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

//  Relaxed CORS for demo (including hardcoded frontend)
const allowedOrigins = [
  "https://euphora-frontend.vercel.app",
  "https://euphora-frontend-j2dxs14ss-vachanas-projects.vercel.app",
  "https://euphora-frontend-vachanas-projects.vercel.app",
  "https://euphora.onrender.com", // allow hardcoded backend domain for axios call
  "http://localhost:5173"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

//  Optional: Root route for health check
app.get("/", (req, res) => {
  res.send("Euphora Backend is running.");
});

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);
app.use("/api/v1/story", storyRoutes);

// Start server
server.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
