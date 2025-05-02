import express from 'express';
import { getMe, login, logout, register } from '../controllers/authController.js';
import { authentication } from '../middleware/auth.js';

const authRouter = express.Router();

authRouter.post("/register",register);
authRouter.post("/login",login);
authRouter.get("/me",authentication,getMe);
authRouter.get("/logout",authentication,logout);

export default authRouter;