import api from './axios'; // Axios instance you created

export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const signupUser = async (data) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};
