import api from './axios';

export async function getRooms() {
  const response = await api.get('/api/rooms');
  return response.data;
}

export async function updateRoom(id, name, description) {
  const response = await api.put(`/api/rooms/${id}`, { name, description });
  return response.data;
}

export async function deleteRoom(id) {
  const response = await api.delete(`/api/rooms/${id}`);
  return response.data;
}

export async function createRoom(name, description) {
  const response = await api.post('/api/rooms', { name, description });
  return response.data;
}

export async function getRoom(id) {
  const response = await api.get(`/api/rooms/${id}`);
  return response.data;
}

export async function searchRooms(keyword) {
  const response = await api.get('/api/rooms/search', { params: { q: keyword } });
  return response.data;
}
