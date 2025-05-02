import express from 'express';
import { deleteTask, getTask, updateTask } from '../controllers/taskController.js';

const taskRouter = express.Router();

taskRouter.get("/:id",getTask);
taskRouter.put("/:id",updateTask);
taskRouter.delete("/:id",deleteTask);

export default taskRouter;