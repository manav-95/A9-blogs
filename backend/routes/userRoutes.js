import express from 'express'
import upload from '../middlewares/upload.js'
import { loginUser, sendResetOTP, verifyOTP, resetPassword, registerUser, getUserById, followUser, unfollowUser } from '../controllers/authController.js'

const router = express.Router();

router.post('/register', upload.single("image"), registerUser);
router.post('/login', loginUser);
router.post('/send-reset-otp', sendResetOTP);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPassword);

router.get('/:id', getUserById);

router.put('/follow/:id', followUser);
router.put('/unfollow/:id', unfollowUser);

export default router;