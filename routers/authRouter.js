import express from 'express';
import { login, register, profile, forgotpassword, resetPassword } from './../controllers/authController.js';
import isAuthenticated from '../middleware/login.js';

const authRouter = express.Router();

authRouter.post('/login',login);
authRouter.post('/register',register);
authRouter.get('/profile',isAuthenticated,profile);
authRouter.post('/forgot-password',forgotpassword);
authRouter.post('/reset-password',resetPassword);



export default authRouter;