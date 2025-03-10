import User from '../models/User.js';
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import RefreshToken from '../models/RefreshToken.js';

dotenv.config();

// Register User
export const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "All fields are required" })
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "Email already exists" });
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const newUser = new User({ email, password: hashpassword })
        await newUser.save();

        return res.status(201).json({ message: "User registered successfully" })

    } catch (error) {
        console.error("Error registering user: ", error);
        return res.status(500).json({ message: 'Server Error' });
    }
}

// generate access Token
const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
}

// generate refresh token
const generateRefreshToken = async (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiry

    await RefreshToken.create({ token, userId: user._id, expiresAt });

    return token;
}

// Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User Not Found" })

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: "Invalid email or password" })

        const accessToken = generateAccessToken(user);
        const refreshToken = await generateRefreshToken(user);

        // Delete existing refresh token for this user (optional)
        await RefreshToken.deleteMany({ userId: user._id });

        // Save refresh token in DB
        const refreshTokenDoc = new RefreshToken({
            token: refreshToken,
            userId: user._id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days expiry
        });

        await refreshTokenDoc.save();


        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: false, path: '/', sameSite: "strict", maxAge: 7 * 24 * 60 * 60 * 1000, });
        res.json({ accessToken })
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Refresh Token
export const refreshAccessToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(401).json({ message: "No refresh token provided" });
        }

        // Find the refresh token in the DB
        const storedToken = await RefreshToken.findOne({ token: refreshToken });

        if (!storedToken) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }

        // Verify token
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
            if (err) return res.status(403).json({ message: "Invalid refresh token" });

            const newAccessToken = jwt.sign(
                { userId: decoded.userId },
                process.env.JWT_SECRET,
                { expiresIn: "15m" }
            );

            res.status(200).json({ accessToken: newAccessToken });
        });

    } catch (error) {
        console.error("Refresh Token Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
