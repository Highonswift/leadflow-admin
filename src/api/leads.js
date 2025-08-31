import api from './axios'; // your axios instance

export const getLeads = async () => {
  const response = await api.get('/leads'); // adjust endpoint if needed
  return response.data;
};
