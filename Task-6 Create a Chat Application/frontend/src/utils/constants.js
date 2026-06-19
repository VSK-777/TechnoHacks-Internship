export const API_URL = import.meta.env.VITE_API_URL || '';
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:9092';

export const COLORS = {
  primary: '#3B82F6',
  secondary: '#2563EB',
  accent: '#22D3EE',
  bgPrimary: '#0F172A',
  bgCard: '#1E293B',
  bgHover: '#334155',
  textPrimary: '#F8FAFC',
  textMuted: '#94A3B8',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  border: '#334155',
};

export const DEFAULT_AVATAR = (username) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(username || 'default')}`;

export const AI_AVATAR = `https://api.dicebear.com/7.x/avataaars/svg?seed=vsk-ai`;

export const EMOJI_LIST = [
  '😀', '😂', '😍', '🥰', '😎', '🤔', '😅', '😢', '😤', '🥺',
  '🔥', '❤️', '💙', '💚', '💛', '🧡', '💜', '🖤', '🤍', '💯',
  '👍', '👎', '👏', '🙌', '🤝', '✌️', '🤞', '💪', '🎉', '🎊',
  '⭐', '✨', '🌟', '💫', '🚀', '💡', '🎯', '✅', '❌', '⚡',
  '🤖', '👾', '🎮', '🎵', '📝', '💻', '🔗', '📌', '🏆', '🌈',
];

export const MESSAGE_PAGE_SIZE = 50;
export const AI_PAGE_SIZE = 20;
