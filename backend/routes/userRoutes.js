import express from 'express'
import { loginUser, refreshAccessToken, registerUser } from '../controllers/authController.js'

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh', refreshAccessToken);

export default router;