import express from "express";
import dotenv from "dotenv"
import Blog from "../models/Blog.js";
import upload from '../middlewares/upload.js'
import auth from '../middlewares/auth.js';
import generateBlogs from '../generateStaticBlogs.js'

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


import generateAccessToken from '../controllers/authController.js'
import User from '../models/User.js'

dotenv.config();
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a new blog
router.post("/create-blog", auth, upload.single("image"), async (req, res) => {
    try {
        if (req.isExpired === true) {
            const { userId } = req.body;
            const newToken = generateAccessToken(userId)
            User.findByIdAndUpdate(userId, { token: newToken }, { new: true })
        }

        const { title, content, tags } = req.body;

        if (!title || !content || !tags.length) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const imageUrl = req.file.filename

        const newBlog = new Blog({ title, content, tags, image: imageUrl, userId: req.body.userId });
        await newBlog.save();
        generateBlogs();

        res.status(201).json({ message: "Blog created successfully!", blog: newBlog, imageUrl: `/uploads/${imageUrl}` });
    } catch (error) {
        console.error("❌ Error saving blog:", error.message, error); // Log full error
        res.status(500).json({ error: error.message });
    }
});


router.put('/blog/:id', upload.single("image"), async (req, res) => {
    try {
        const { id } = req.params;
        const {title, content, tags} = req.body;
        const existingBlog = await Blog.findById(id);
        if (!existingBlog) {
            return res.status(404).json({ error: "Blog not found" });
        }
        
        // Update fields
        existingBlog.title = title;
        existingBlog.content = content;
        existingBlog.tags = tags;
        if (req.file) {
            existingBlog.image = req.file.filename; // Only update image if a new file is uploaded
        }
        
        await existingBlog.save();
        generateBlogs();
        
        res.status(200).json({ message: "Blog updated successfully!", blog: existingBlog });
    } catch (error) {
        console.error("❌ Error saving blog:", error.message, error); // Log full error
        res.status(500).json({ error: error.message });
    }
});


// Delete Blog By Id
router.delete('/blog/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteBlog = await Blog.findByIdAndDelete(id);
        if (!deleteBlog) return res.status(404).json({ message: "Blog not found" });

        // Defining the static file path 
        const filePath = path.join(__dirname, '..', 'public', 'blogs', `${id}.html`);

        // Check if the static file exists and delete it
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`Deleted static file: ${filePath}`);
        }

       return res.status(200).json({ message: "Blog and static file deleted Successfully" })
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ message: "Server Error", error });
    }
})




router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find()
            .populate('userId', 'username email profileImage followers')
            .exec();
        const blogsList = blogs.map(blog => ({
            _id: blog._id,
            title: blog.title,
            content: blog.content,
            tags: blog.tags,
            author: blog.userId ? blog.userId.username : "Unknown",
            authorId: blog.userId._id,
            authorFollowers: blog.userId.followers.length,
            authorImage: blog.userId?.profileImage
                ? `http://localhost:5000/uploads/${blog.userId.profileImage}`
                : null,
            imageUrl: `http://localhost:5000/uploads/${blog.image}`,
            createdAt: new Date(blog.createdAt).toLocaleDateString("en-US", {
                month: "long", // Full month name (e.g., "March")
                day: "2-digit", // Two-digit day (e.g., "08")
                year: "numeric" // Four-digit year (e.g., "2025")
            }),
        }));
        res.json({ blogs: blogsList });
    } catch (error) {
        console.error("❌ Error fetching blogs:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Get Blogs of an User
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const userBlogs = await Blog.find({ userId: id });
    if (!userBlogs.length) {
        return res.status(404).json({ message: "No blogs found for this user" });
    }
    res.status(200).json(userBlogs);
    try {

    } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).json({ message: "Server error" });
    }
})


router.get('/blog/:id', async (req, res) => {
    try {

        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog Not Found" })
        }
        res.status(200).json(blog);
    } catch (error) {
        console.error("Error fetching Requested blog:", error);
        res.status(500).json({ message: "Server Error" })
    }
})



export default router;
