import express from 'express';
import authRouter from './authRoutes.js';
import projectRouter from './projectRoutes.js';
import taskRouter from './taskRoutes.js';
import { authentication } from '../middleware/auth.js';

const router = express.Router();

router.use("/auth",authRouter);
router.use("/projects",authentication,projectRouter);
router.use("/tasks",authentication,taskRouter);

export default router;