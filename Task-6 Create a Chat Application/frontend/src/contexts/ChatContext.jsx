import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';
import { useSocketContext } from './SocketContext';
import { getMessages } from '../api/messages';
import { getRooms, createRoom as createRoomApi } from '../api/rooms';
import { MESSAGE_PAGE_SIZE } from '../utils/constants';

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const { user } = useAuth();
  const { socket, isConnected } = useSocketContext();
  const [currentRoom, setCurrentRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const previousRoomRef = useRef(null);

  useEffect(() => {
    if (!socket || !isConnected) return;

    const handleNewMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    const handleUserJoined = ({ username, onlineUsers: users }) => {
      setOnlineUsers(users || []);
    };

    const handleUserLeft = ({ username, onlineUsers: users }) => {
      setOnlineUsers(users || []);
    };

    const handleUserTyping = ({ username }) => {
      if (username !== user?.username) {
        setTypingUsers((prev) => {
          if (prev.includes(username)) return prev;
          return [...prev, username];
        });
      }
    };

    const handleUserStopTyping = ({ username }) => {
      setTypingUsers((prev) => prev.filter((u) => u !== username));
    };

    const handleOnlineUsers = (users) => {
      setOnlineUsers(users || []);
    };

    socket.on('receive_message', handleNewMessage);
    socket.on('user_joined', handleUserJoined);
    socket.on('user_left', handleUserLeft);
    socket.on('user_typing', handleUserTyping);
    socket.on('user_stop_typing', handleUserStopTyping);
    socket.on('online_users', handleOnlineUsers);

    return () => {
      socket.off('receive_message', handleNewMessage);
      socket.off('user_joined', handleUserJoined);
      socket.off('user_left', handleUserLeft);
      socket.off('user_typing', handleUserTyping);
      socket.off('user_stop_typing', handleUserStopTyping);
      socket.off('online_users', handleOnlineUsers);
    };
  }, [socket, isConnected, user]);

  useEffect(() => {
    if (user) {
      getRooms().then(loadedRooms => {
        setRooms(loadedRooms);
      }).catch(console.error);
    } else {
      setRooms([]);
      setCurrentRoom(null);
      localStorage.removeItem('lastRoomId');
    }
  }, [user]);



  const loadMessages = useCallback(async (roomId, page = 0) => {
    setLoadingMessages(true);
    try {
      const data = await getMessages(roomId, page, MESSAGE_PAGE_SIZE);
      const msgs = Array.isArray(data) ? data : data.content || [];
      if (page === 0) {
        setMessages(msgs.reverse());
      } else {
        setMessages((prev) => [...msgs.reverse(), ...prev]);
      }
      setCurrentPage(page);
      setHasMore(msgs.length >= MESSAGE_PAGE_SIZE);
    } catch (error) {
      console.error('Failed to load messages:', error);
    } finally {
      setLoadingMessages(false);
    }
  }, []);

  const joinRoom = useCallback(
    (room) => {
      if (!socket || !user) return;

      if (previousRoomRef.current) {
        socket.emit('leave_room', previousRoomRef.current.id.toString());
      }

      setMessages([]);
      setOnlineUsers([]);
      setTypingUsers([]);
      setCurrentPage(0);
      setHasMore(true);
      setCurrentRoom(room);
      previousRoomRef.current = room;
      localStorage.setItem('lastRoomId', room.id.toString());

      socket.emit('join_room', room.id.toString());

      loadMessages(room.id, 0);
    },
    [socket, user, loadMessages]
  );

  useEffect(() => {
    if (user && socket && isConnected && rooms.length > 0 && !currentRoom) {
      const lastRoomId = localStorage.getItem('lastRoomId');
      if (lastRoomId) {
        const roomToJoin = rooms.find(r => r.id.toString() === lastRoomId);
        if (roomToJoin) {
          joinRoom(roomToJoin);
        }
      }
    }
  }, [user, socket, isConnected, rooms, currentRoom, joinRoom]);

  const leaveRoom = useCallback(
    (roomId) => {
      if (!socket || !user) return;
      socket.emit('leave_room', roomId.toString());
      setCurrentRoom(null);
      setMessages([]);
      setOnlineUsers([]);
      setTypingUsers([]);
      previousRoomRef.current = null;
      localStorage.removeItem('lastRoomId');
    },
    [socket, user]
  );

  const createRoom = useCallback(async ({ name, description, isPrivate }) => {
    try {
      const newRoom = await createRoomApi(name, description, isPrivate);
      setRooms((prev) => [...prev, newRoom]);
      return newRoom;
    } catch (error) {
      console.error('Failed to create room:', error);
      throw error;
    }
  }, []);

  const updateRoomDetails = useCallback((updatedRoom) => {
    setRooms((prev) => prev.map(r => r.id === updatedRoom.id ? updatedRoom : r));
    if (currentRoom?.id === updatedRoom.id) {
      setCurrentRoom(updatedRoom);
    }
  }, [currentRoom]);

  const removeRoom = useCallback((roomId) => {
    setRooms((prev) => prev.filter(r => r.id !== roomId));
    if (currentRoom?.id === roomId) {
      setCurrentRoom(null);
    }
  }, [currentRoom]);

  const sendMessage = useCallback(
    (text) => {
      if (!socket || !user || !currentRoom || !text.trim()) return;
      socket.emit('send_message', {
        roomId: currentRoom.id,
        senderId: user.userId || user.id,
        senderName: user.username,
        message: text.trim(),
      });
    },
    [socket, user, currentRoom]
  );

  const startTyping = useCallback(() => {
    if (!socket || !currentRoom || !user) return;
    socket.emit('typing_start', {
      roomId: currentRoom.id,
      username: user.username,
    });
  }, [socket, currentRoom, user]);

  const stopTyping = useCallback(() => {
    if (!socket || !currentRoom || !user) return;
    socket.emit('typing_stop', {
      roomId: currentRoom.id,
      username: user.username,
    });
  }, [socket, currentRoom, user]);

  const loadMoreMessages = useCallback(() => {
    if (!currentRoom || !hasMore || loadingMessages) return;
    loadMessages(currentRoom.id, currentPage + 1);
  }, [currentRoom, hasMore, loadingMessages, currentPage, loadMessages]);

  const openAI = useCallback(() => setIsAIOpen(true), []);
  const closeAI = useCallback(() => setIsAIOpen(false), []);

  const value = {
    rooms,
    currentRoom,
    setCurrentRoom,
    messages,
    onlineUsers,
    typingUsers,
    isTyping: typingUsers.length > 0,
    sendMessage,
    joinRoom,
    leaveRoom,
    createRoom,
    updateRoomDetails,
    removeRoom,
    loadMessages,
    loadMoreMessages,
    startTyping,
    stopTyping,
    hasMore,
    loadingMessages,
    isAIOpen,
    openAI,
    closeAI,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}

export default ChatContext;
