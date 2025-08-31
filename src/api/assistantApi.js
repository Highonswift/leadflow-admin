import api from './axios';

// Fetch all assistants
export const fetchAssistants = async () => {
  const response = await api.get('/assistants');
  return response.data;
};

// Create a new assistant
export const createAssistant = async (data) => {
  const response = await api.post('/assistants', data);
  return response.data;
};

// Update an assistant
export const updateAssistant = async (id, data) => {
  const response = await api.put(`/assistants/${id}`, data);
  return response.data;
};

// Delete an assistant
export const deleteAssistant = async (id) => {
  const response = await api.delete(`/assistants/${id}`);
  return response.data;
};
