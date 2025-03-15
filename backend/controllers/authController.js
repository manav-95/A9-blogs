import User from '../models/User.js';
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

dotenv.config();

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

// Login User
// export const loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ message: "User Not Found" })

//         const isPasswordValid = await bcrypt.compare(password, user.password);

//         if (!isPasswordValid) return res.status(400).json({ message: "Invalid email or password" })

//         const accessToken = generateAccessToken(user);

//         user.token = accessToken;
//         await user.save(); 

//         res.json({ accessToken })
//     } catch (error) {
//         res.status(500).json({ message: "Server Error" });
//     }
// };

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    let existingUser = await User.findOne({ email }).select('email password token');
    const ValidUser = bcrypt.compareSync(password, existingUser.password);
    if (ValidUser) {
        let existingToken = existingUser.token;
        if (existingToken != undefined) {
            const exp = jwt.decode(existingToken);
            const date = Date.now();
            if (date >= exp * 1000) {
                const newtoken = generateAccessToken(existingUser.id);
                existingUser = User.findByIdAndUpdate(existingUser.id, { token: newtoken }, { new: true });
            }
        } else {
            const newtoken = generateAccessToken(existingUser);
            existingUser = await User.findByIdAndUpdate(existingUser.id, { token: newtoken }, { new: true });

        }
        const user = existingUser.toObject();
        return res.status(200).json({ user });
    }
    throw new Error('Invalid Credentials');
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
        .populate("followings", 'username profileImage bio')
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
