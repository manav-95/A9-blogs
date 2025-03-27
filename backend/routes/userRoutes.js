import express from 'express'
import upload from '../middlewares/upload.js'
import { loginUser, resetPassword, registerUser, getUserById, followUser, unfollowUser } from '../controllers/authController.js'

const router = express.Router();

router.post('/register', upload.single("image"), registerUser);
router.post('/login', loginUser);
router.post('/reset-password', resetPassword);
router.get('/:id', getUserById);
router.put('/follow/:id', followUser);
router.put('/unfollow/:id', unfollowUser);

export default router;