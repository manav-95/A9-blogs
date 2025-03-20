import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import multer from "multer";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import "./config/db.js";

dotenv.config();

// Resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
    origin: "http://localhost:5174",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/blogs", express.static(path.join(__dirname, "public", "blogs")));

// Serve static HTML for individual blogs
// app.get('/blogs/:id', (req, res) => {
//     const blogPath = path.join(__dirname, 'public', 'blogs', `${req.params.id}.html`);
//     res.sendFile(blogPath, (err) => {
//       if (err) {
//         res.status(404).send('Blog not found');
//       }
//     });
//   });


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Is Running On PORT: ${PORT}`)
});


