import express from 'express';
import { createTask, getTasks } from '../controllers/taskController.js';
import { createProject, deleteProject, getProject, getProjects, updateProject } from '../controllers/projectController.js';

const projectRouter = express.Router();

projectRouter.get("/",getProjects);
projectRouter.get("/:id",getProject);
projectRouter.post("/",createProject);
projectRouter.put("/:id",updateProject);
projectRouter.delete("/:id",deleteProject);
projectRouter.get("/:projectId/tasks",getTasks);
projectRouter.post("/:projectId/tasks",createTask);

export default projectRouter;