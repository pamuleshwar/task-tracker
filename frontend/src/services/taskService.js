import axios from 'axios';

const API_URL = '/api/tasks';

const getTasks = async (projectId) => {
  const token = localStorage.getItem('token');

  const response = await axios.get(`/api/projects/${projectId}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};

const getTask = async (id) => {
  const token = localStorage.getItem('token');

  const response = await axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};

const createTask = async (projectId, taskData) => {
  const token = localStorage.getItem('token');

  const response = await axios.post(
    `/api/projects/${projectId}/tasks`,
    taskData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

const updateTask = async (id, taskData) => {
  const token = localStorage.getItem('token');

  const response = await axios.put(`${API_URL}/${id}`, taskData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};

const deleteTask = async (id) => {
  const token = localStorage.getItem('token');

  await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export default {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
};