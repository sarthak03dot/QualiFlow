import express from 'express';
import { registerUser, loginUser, refreshToken, logout } from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh', refreshToken);
router.post('/logout', logout);

export default router;
