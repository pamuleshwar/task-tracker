import { useState } from 'react';
import axios from 'axios';
import ProjectForm from './ProjectForm';
import { BASE_URL } from '../../constant';

const ProjectCard = ({ project, onProjectUpdated, onProjectDeleted, onClick }) => {
  const [showEditForm, setShowEditForm] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`${BASE_URL}/projects/${project._id}`, { withCredentials: true });
        onProjectDeleted();
      } catch (err) {
        console.error('Failed to delete project:', err);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {showEditForm && (
        <ProjectForm
          project={project}
          onClose={() => setShowEditForm(false)}
          onSuccess={() => {
            setShowEditForm(false);
            onProjectUpdated();
          }}
        />
      )}
      <div 
        className="p-6 cursor-pointer hover:bg-gray-50" 
        onClick={onClick}
      >
        <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
        <p className="text-gray-600 mb-4">
          {project.description || 'No description provided'}
        </p>
      </div>
      <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowEditForm(true);
          }}
          className="text-blue-500 hover:text-blue-700"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;