import axios from 'axios';

const API_URL = '/api/projects';

const getProjects = async () => {
  const token = localStorage.getItem('token');

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};

const createProject = async (projectData) => {
  const token = localStorage.getItem('token');

  const response = await axios.post(API_URL, projectData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};

const updateProject = async (id, projectData) => {
  const token = localStorage.getItem('token');

  const response = await axios.put(`${API_URL}/${id}`, projectData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};

const deleteProject = async (id) => {
  const token = localStorage.getItem('token');

  await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export default {
  getProjects,
  createProject,
  updateProject,
  deleteProject
};