import { format, formatDistanceToNowStrict, isToday, isYesterday, parseISO } from 'date-fns';

function ensureDate(timestamp) {
  if (!timestamp) return new Date();
  if (timestamp instanceof Date) return timestamp;
  if (typeof timestamp === 'number') return new Date(timestamp);
  try {
    return parseISO(timestamp);
  } catch {
    return new Date(timestamp);
  }
}

export function formatTime(timestamp) {
  const date = ensureDate(timestamp);
  return format(date, 'HH:mm');
}

export function formatDate(timestamp) {
  const date = ensureDate(timestamp);
  return format(date, 'MMM dd, yyyy');
}

export function formatRelative(timestamp) {
  const date = ensureDate(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);

  if (diffSec < 10) return 'just now';
  if (diffSec < 60) return `${diffSec}s ago`;
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;

  if (isToday(date)) return `Today at ${format(date, 'HH:mm')}`;
  if (isYesterday(date)) return `Yesterday at ${format(date, 'HH:mm')}`;

  return formatDistanceToNowStrict(date, { addSuffix: true });
}

export function formatMessageDate(timestamp) {
  const date = ensureDate(timestamp);
  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';
  return format(date, 'MMMM dd, yyyy');
}

export function truncate(text, maxLength = 50) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function getInitials(name) {
  if (!name) return '??';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export function getPasswordStrength(password) {
  if (!password) return { score: 0, label: '', color: '#334155' };
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const levels = [
    { label: 'Very Weak', color: '#EF4444' },
    { label: 'Weak', color: '#F59E0B' },
    { label: 'Fair', color: '#F59E0B' },
    { label: 'Strong', color: '#10B981' },
    { label: 'Very Strong', color: '#22D3EE' },
  ];

  const level = levels[Math.min(score, levels.length) - 1] || levels[0];
  return { score, label: level.label, color: level.color, percent: (score / 5) * 100 };
}
