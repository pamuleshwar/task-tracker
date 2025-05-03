import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { BASE_URL } from '../../constant';

const TasksList = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const getTaskData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/projects/${projectId}/tasks`, { withCredentials: true });
      setTasks(response?.data?.data || []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      setLoading(true);
      await axios.post(`${BASE_URL}/projects/${projectId}/tasks`, taskData, { withCredentials: true });
      await getTaskData();
      setShowForm(false);
    } catch (err) {
      console.error(err);
      setError('Failed to create task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (taskId, updatedData) => {
    try {
      setLoading(true);
      await axios.patch(`${BASE_URL}/projects/${projectId}/tasks/${taskId}`, updatedData, { withCredentials: true });
      await getTaskData();
    } catch (err) {
      console.error(err);
      setError('Failed to update task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}/projects/${projectId}/tasks/${taskId}`, { withCredentials: true });
      await getTaskData();
    } catch (err) {
      console.error(err);
      setError('Failed to delete task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTaskData();
  }, [projectId]);

  if (loading && tasks.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && tasks.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p>{error}</p>
          <button 
            onClick={getTaskData}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Project Tasks</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          New Task
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}

      {showForm && (
        <TaskForm
          task={null}
          onClose={() => setShowForm(false)}
          onSubmit={createTask}
          loading={loading}
        />
      )}

      {tasks.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No Tasks Found</h3>
          <p className="text-gray-500 mb-4">Get started by creating your first task</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Create Task
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onUpdate={updateTask}
              onDelete={deleteTask}
              loading={loading}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TasksList;