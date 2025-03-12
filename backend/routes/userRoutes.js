import express from 'express'
import upload from '../middlewares/upload.js'
import { loginUser, registerUser, getUserById } from '../controllers/authController.js'

const router = express.Router();

router.post('/register', upload.single("image"), registerUser);
router.post('/login', loginUser);
router.get('/:id', getUserById);

export default router;