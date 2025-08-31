import api from './axios'; // your axios instance

// Fetch all conversations
export const getConversations = async () => {
  const res = await api.get('/conversation');
  return res.data;
};

// Fetch a single conversation by ID (optional, if needed separately)
export const getConversationById = async (id) => {
  const res = await api.get(`/conversation/${id}`);
  return res.data;
};
