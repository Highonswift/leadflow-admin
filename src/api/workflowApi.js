import api from './axios'; // your axios instance

export const getWorkflow = async () => {
  const response = await api.get('/workflows'); // adjust endpoint as needed
  return response.data;
};

export const createWorkflow = async (data) => {
  const response = await api.post('/workflows', data);
  return response.data;
}