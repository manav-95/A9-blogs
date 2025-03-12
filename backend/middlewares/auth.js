import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'


dotenv.config();

const auth = async (req, res, next) => {
    try {

        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized – No token provided' });
        }

        const { exp } = jwt.decode(token);
        const date = Date.now();
        if (date >= exp * 1000) {
            req.isExpired = true
        } else {
            req.isExpired = false
        }
        next();

    } catch (error) {
        console.error('❌ JWT Verification Failed:', error.message);
        return res.status(403).json({ message: 'Invalid token' });
    }
}

export default auth;