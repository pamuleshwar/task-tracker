import { Task } from '../models/Task.js';
import { Project } from '../models/Project.js';

// @desc    Get all tasks for a project
// @route   GET /api/projects/:projectId/tasks
export const getTasks = async (req, res) => {
  try{
    const {projectId} = req.params;
    const user = req.user;

    // Check if project exists and belongs to user
    const project = await Project.findOne({
      _id: projectId,
      user: user._id
    });

    if (!project) {
      throw new Error(`Project not found with id of ${projectId}`);
    }

    const tasks = await Task.find({ project: projectId });

    res.json({
      message : "Data fetched successfully",
      count: tasks.length,
      data: tasks,
    });
    
  }catch(err){
    res.status(400).send("Unable to fetch data");
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
export const getTask = async (req, res) => {
  try{
    const {id} = req.params;
    const user = req.user;

    const task = await Task.findOne({
      _id: id,
      user: user._id
    }).populate('project', 'name description');
  
    if (!task) {
      throw new Error(`Task not found with id of ${id}`);
    }
  
    res.status(200).json({
      message : "task fetched successfully",
      data: task
    });
  }catch(err){
    res.status(400).send("Something went wrong");
  }
};

// @desc    Create new task
// @route   POST /api/projects/:projectId/tasks
export const createTask = async (req, res) => {
  try{
    const {projectId} = req.params;
    const user = req.user;

    req.body.project = projectId;
    req.body.user = user._id;

    // Check if project exists and belongs to user
    const project = await Project.findOne({
      _id: projectId,
      user: user._id
    });

    if (!project) {
      throw new Error(`Project not found with id of ${req.params.projectId}`);
    }

    const newTask = new Task(req.body);

    const savedTask = await  newTask.save();

    res.json({
      message : "Task created successfully",
      data: savedTask,
    });

  }catch(err){
    res.status(400).send("Failed to create task");
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
export const updateTask = async (req, res) => {
  try{
    const {id} = req.params;
    const user = req.user;
    
    const task = await Task.findById(id);

    if (!task) {
      throw new Error(`Task not found with id of ${req.params.id}`);
    }

    // Make sure user is task owner
    if (task.user.toString() !== user._id.toString()) {
      throw new Error(`User ${req.user.id} is not authorized to update this task`);
    }

    Object.keys(req.body).forEach((key) => task[key]=req.body[key]);

    const updatedTask = await task.save();

    // task = await Task.findByIdAndUpdate(id, req.body, {
    //   new: true,
    //   runValidators: true
    // });

    res.json({
      message : "task updated successfully",
      data: updatedTask
    });

  }catch(err){
    res.status(400).send("Something went wrong");
  }
}

// @desc    Delete task
// @route   DELETE /api/tasks/:id
export const deleteTask = async (req, res) => {
  try{
    const {id} = req.params;
    const user = req.user;

    const task = await Task.findById(id);

    if (!task) {
      throw new Error(`Task not found with id of ${req.params.id}`);
    }

    // Make sure user is task owner
    if (task.user.toString() !== user._id.toString()) {
      throw new Error(`User ${user._id} is not authorized to delete this task`);
    }

    await Task.findByIdAndDelete(id);

    res.json({
      message : "task deleted successfully",
      data: {}
    });
  }catch(err){
    res.status(400).status("ERROR : " + err.message);
  }
};