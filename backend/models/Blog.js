import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
        },
        tags: {
            type: [],
            default: [],
            required: true,
        },
        image: String,
        createdAt: {
            type: Date,
            default: Date.now, // Auto-generate timestamp
        },
    },
    { timestamps: true } // Adds createdAt & updatedAt automatically
);

const Blog = mongoose.model("Blog", BlogSchema);
export default Blog;
