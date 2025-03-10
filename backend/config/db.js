import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    throw new Error("❌ MONGO_URI is not defined in the environment variables!");
}

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI); // No need for extra options in Mongoose 6+
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error);
        process.exit(1);
    }
};

// Ensure we connect before running queries
await connectDB();
