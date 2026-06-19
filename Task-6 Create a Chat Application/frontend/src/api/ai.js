import api from './axios';
import { AI_PAGE_SIZE, API_URL } from '../utils/constants';

export async function sendMessage(message, conversationId) {
  const response = await api.post('/api/ai/chat', { message, conversationId });
  return response.data;
}

export async function getHistory(page = 0, size = AI_PAGE_SIZE) {
  const response = await api.get('/api/ai/history', {
    params: { page, size },
  });
  return response.data;
}

export async function streamMessage(message, conversationId, onChunk, onDone, onError) {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${API_URL}/api/ai/chat/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message, conversationId }),
    });

    if (!response.ok) {
      throw new Error(`Stream failed: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('data:')) {
          const data = trimmed.slice(5).trim();
          if (data === '[DONE]') {
            onDone?.();
            return;
          }
          try {
            const parsed = JSON.parse(data);
            onChunk?.(parsed);
          } catch {
            onChunk?.({ response: data });
          }
        }
      }
    }

    onDone?.();
  } catch (error) {
    onError?.(error);
  }
}
