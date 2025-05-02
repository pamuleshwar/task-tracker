import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';
import { BASE_URL } from '../../constant';
import { useDispatch } from 'react-redux';
import { addProject } from '../../store/projectSlice';

const ProjectsList = () => {
  const dispatch = useDispatch();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const getProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/projects`, { withCredentials: true });
      setProjects(response?.data?.data);
      dispatch(addProject(response?.data?.data));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch projects');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 my-5">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Projects</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          New Project
        </button>
      </div>

      {showForm && (
        <ProjectForm
          onClose={() => setShowForm(false)}
          onSuccess={() => {
            setShowForm(false);
            getProjects();
          }}
        />
      )}

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">You don't have any projects yet.</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Create Your First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onProjectUpdated={getProjects}
              onProjectDeleted={getProjects}
              onClick={() => navigate(`/projects/${project._id}/tasks`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsList;