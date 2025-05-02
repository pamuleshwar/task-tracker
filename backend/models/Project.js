import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a project name'],
    trim: true,
    maxlength: [100, 'Project name cannot be more than 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});



// Ensure a user can't have more than 4 projects
ProjectSchema.pre('save', async function(next) {
  const projectsCount = await this.model('Project').countDocuments({ user: this.user });
  if (projectsCount >= 4) {
    throw new Error('Maximum of 4 projects per user reached');
  }
  next();
});


export const Project = mongoose.model("Project",ProjectSchema);