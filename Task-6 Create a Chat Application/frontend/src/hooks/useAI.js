import { useState, useCallback } from 'react';
import { sendMessage as apiSendMessage } from '../api/ai';

export const useAI = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [conversationId, setConversationId] = useState(null);

  const sendMessage = useCallback(async () => {
    if (!input.trim()) return;
    const msg = input.trim();
    setInput('');
    setIsLoading(true);
    setError(null);
    setMessages(prev => [...prev, { role: 'user', content: msg, timestamp: new Date().toISOString() }]);

    try {
      const res = await apiSendMessage(msg, conversationId);
      if (res.conversationId) setConversationId(res.conversationId);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: res.response, 
        timestamp: res.timestamp || new Date().toISOString() 
      }]);
    } catch (err) {
      setError(err.message || 'Failed to get AI response');
    } finally {
      setIsLoading(false);
    }
  }, [input, conversationId]);

  const clearHistory = useCallback(() => {
    setMessages([]);
    setConversationId(null);
  }, []);

  return {
    messages,
    input,
    setInput,
    sendMessage,
    isLoading,
    error,
    clearHistory
  };
};
