import User from '../models/User.js';
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

import { sendOTP } from '../utils/emailService.js'
import crypto from "crypto";

dotenv.config();

// Temporary storage for OTPs (use Redis for production)
const otpStore = new Map();

// generate access Token
const generateAccessToken = (userId) => {
    console.log(userId)
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })

}

// Register User
export const registerUser = async (req, res) => {
    try {
        const { username, email, password, bio } = req.body;
        const profileImage = req.file.filename;

        if (!username || !email || !password || !bio) {
            res.status(400).json({ message: "All fields are required" })
        }

        const existingUser = await User.find({ email, username });

        if (existingUser === email) {
            res.status(400).json({ message: "Email already exists" });
        }

        if (existingUser === username) {
            res.status(400).json({ message: "Username already exists" });
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, role: 'user', email, password: hashpassword, profileImage: profileImage, bio })
        await newUser.save();

        return res.status(201).json({ message: "User registered successfully" })

    } catch (error) {
        console.error("Error registering user: ", error);
        return res.status(500).json({ message: 'Server Error' });
    }
}

// Login USer
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        let existingUser = await User.findOne({ email }).select('email password token');
        if (!existingUser) {
            console.log("Existing User Not Found")
            return res.status(404).json({ message: "User Not Found" })
        }

        console.log(existingUser)
        const ValidUser = bcrypt.compareSync(password, existingUser.password);

        if (ValidUser) {
            let existingToken = existingUser.token;
            if (existingToken !== undefined) {
                const decodedToken = jwt.decode(existingToken);
                const exp = decodedToken.exp
                const date = Date.now();
                if (date >= exp * 1000) {
                    const newtoken = generateAccessToken(existingUser._id);
                    existingUser = await User.findByIdAndUpdate(existingUser._id, { token: newtoken }, { new: true });
                }
            } else {
                const newtoken = generateAccessToken(existingUser._id);
                existingUser = await User.findByIdAndUpdate(existingUser._id, { token: newtoken }, { new: true });

            }
            const user = existingUser.toObject();
            return res.status(200).json({ user });
        } else {
            return res.status(401).json({ message: "Invalid Credentials" })
        }
    } catch (error) {
        console.error("Error Logging User: ", error.message)
    }
}

// Get User By Id
export const getUserById = async (req, res) => {
    const { id } = req.params;

    // ✅ Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid user ID format" });
    }

    try {
        const user = await User.findById(id)
            .populate("followers", 'username profileImage bio')
            .populate("followings", 'username profileImage bio followers')
            .exec();

        if (!user) {
            return res.status(404).json({ message: "User Not Found" })
        }

        res.status(200).json(user);

    } catch (error) {
        console.error("❌ Error fetching user:", error.message);
        res.status(500).json({ message: 'Server Error' });
    }
}

// Send Reset Password OTP
export const sendResetOTP = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Generate otp
        const otp = crypto.randomInt(1000, 9999); // 4-digit otp
        otpStore.set(email, { otp, expiresAt: Date.now() + 10 * 60 * 1000 }); // valid for 10 minutes
        console.log("OTP STORE: ", JSON.stringify(Object.fromEntries(otpStore), null, 2));
        // send OTP via email
        await sendOTP(email, otp);
        res.status(200).json({ message: `OTP sent to email ${email}` })

    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// Verify OTP
export const verifyOTP = async (req, res) => {
    const { otp, email } = req.body;

    try {
        console.log("OTP STORE AT VERIFICATION:", otpStore);

        const getstoredOTP = otpStore.get(email);

        if (!getstoredOTP) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        const storedOTP = getstoredOTP.otp;

        if (storedOTP === Number(otp)) {
            console.log("OTP VERIFIED SUCCESSFULLY");

            // Remove OTP from store after successful verification
            otpStore.delete(email);

            return res.status(200).json({ message: "OTP verified successfully" });
        } else {
            return res.status(400).json({ message: "Incorrect OTP" });
        }

    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ message: "Failed to verify OTP" });
    }
};

// Reset Password
export const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            console.error("All Fields are Required");
            return res.status(400).json({ message: "All Fields Are Required" })
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User Not Found" })

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;

        await user.save();
        return res.status(201).json({ message: "Password Reset/Changed Successfully" })

    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
}

// Follow user
export const followUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        if (id === userId) {
            return res.status(400).json({ message: "You can't follow yourself" });
        }

        const userToFollow = await User.findById(id)
        const currentUser = await User.findById(userId)
            ;

        if (!userToFollow.followers.includes(userId)) {
            userToFollow.followers.push(userId);
            currentUser.followings.push(id);
            await userToFollow.save();
            await currentUser.save();
            return res.status(200).json({ message: "User Followed Successfully" });
        } else {
            return res.status(400).json({ messsage: "Already Following the user" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Unfollow User 
export const unfollowUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        if (id === userId) {
            return res.status(400).json({ message: "You can't unfollow Yourself" });
        }

        const userToUnfollow = await User.findById(id);
        const currentUser = await User.findById(userId);

        if (userToUnfollow.followers.includes(userId)) {
            userToUnfollow.followers = userToUnfollow.followers.filter((f) => f.toString() !== userId);
            currentUser.followings = currentUser.followings.filter((f) => f.toString() !== id);
            await userToUnfollow.save();
            await currentUser.save();
            return res.status(200).json({ message: "User Unfollowed Successfully" });
        } else {
            return res.status(400).json({ message: 'Not Following this User' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export default generateAccessToken;
