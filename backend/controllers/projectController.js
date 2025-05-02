import { Project } from '../models/Project.js';

// @desc    Get all projects for a user
// @route   GET /api/projects
export const getProjects = async (req, res) => {
  try{
    const user = req.user;

    const projects = await Project.find({ user: user._id });

    res.json({
      message : "Project fetched successfully",
      count: projects.length,
      data: projects
    });

  }catch(err){
    res.status(400).send("ERROR : " + err.message);
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
export const getProject = async (req, res) => {
  try{
    const user = req.user;
    const project = await Project.findOne({
      _id: req.params.id,
      user: user._id
    });

    if (!project) {
      throw new Error(`Project not found with id of ${req.params.id}`);
    }

    res.json({
      message : "Data fetched successfully",
      data: project
    });

  }catch(err){
    res.status(400).send("ERROR : " + err.message);
  }
};

// @desc    Create new project
// @route   POST /api/projects
export const createProject = async (req, res) => {
  try{
    const user = req.user;

    req.body.user = user._id;

    const newProject = new Project(req.body);

    const savedProject = await newProject.save();

    res.json({
      message : "Project created successfully",
      data: savedProject,
    });

  }catch(err){
    res.status(400).send("ERROR : " + err.message);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
export const updateProject = async (req, res) => {
  try{
    const {id} = req.params;
    const user = req.user;

    const project = await Project.findById(id);

    if (!project) {
      throw new Error(`Project not found with id of ${req.params.id}`);
    }

    // Make sure user is project owner
    if (project.user.toString() !== req.user._id.toString()) {
      throw new Error(`User ${req.user.id} is not authorized to update this project`);
    }

    const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      message : "Project updated successfully",
      data: updatedProject,
    });
  }catch(err){
    res.status(400).send("ERROR : " + err.message);
  }
}

// @desc    Delete project
// @route   DELETE /api/projects/:id
export const deleteProject = async (req, res) => {
  try{
    const {id} = req.params;
    const user = req.user;

    const project = await Project.findById(id);

    if (!project) {
      throw new Error(`Project not found with id of ${id}`);
    }

    // Make sure user is project owner
    if (project.user.toString() !== user._id.toString()) {
      throw new Error(`User ${req.user._id} is not authorized to delete this project`);
    }

    await Project.findByIdAndDelete(id);

    res.json({
      message : "Project Deleted successfully",
      data: {}
    });
  }catch(err){
    res.status(400).send("ERROR : " + err.message);
  }
};