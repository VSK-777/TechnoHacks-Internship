import api from './axios';
import { MESSAGE_PAGE_SIZE } from '../utils/constants';

export async function getMessages(roomId, page = 0, size = MESSAGE_PAGE_SIZE) {
  const response = await api.get(`/api/messages/room/${roomId}`, {
    params: { page, size },
  });
  return response.data;
}

export async function searchMessages(roomId, keyword) {
  const response = await api.get(`/api/messages/${roomId}/search`, {
    params: { q: keyword },
  });
  return response.data;
}
