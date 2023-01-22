import express from 'express'
import { changePassword, forgotPassword, login, logout, register } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/verify.js';

const router = express.Router()

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.put('/changePassword', verifyToken, changePassword);
router.post('/forgotPassword', forgotPassword);

export default router