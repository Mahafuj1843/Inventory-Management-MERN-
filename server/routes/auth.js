import express from 'express'
import { changePassword, login, logout, register } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/verify.js';

const router = express.Router()

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.put('/changePassword', verifyToken, changePassword)

export default router