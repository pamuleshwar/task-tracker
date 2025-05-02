import axios from 'axios';

export const register = async (name, email, password, country) => {
  const response = await axios.post(`${process.env.BASE_URL}/auth/register`, {
    name,
    email,
    password,
    country
  }, {withCredentials : true});
};

export const login = async (email, password) => {
  const response = await axios.post(`http://localhost:8000/auth/login`, {
    email,
    password
  }, {withCredentials : true});

  return response?.data?.data;
};

export const logout = async () => {
  await axios.get(`${process.env.BASE_URL}/auth/logout`,{withCredentials : true});
};

export const getMe = async () => {

  const response = await axios.get(`${process.env.BASE_URL}/auth/me`,{withCredentials : true});
};