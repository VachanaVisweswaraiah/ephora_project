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

// CORS: Allow only trusted frontend domains
const allowedOrigins = [
  "https://euphora-frontend.vercel.app",
  "https://euphora-frontend-j2dxs14ss-vachanas-projects.vercel.app",
  "https://euphora-frontend-vachanas-projects.vercel.app"
];

const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  };
  

app.use(cors(corsOptions));

//  REMOVE fallback headers – unnecessary and might cause conflicts
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   next();
// });

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
