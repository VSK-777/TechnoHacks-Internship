import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import { SOCKET_URL } from '../utils/constants';
import { useAuth } from './AuthContext';

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      const token = localStorage.getItem('token');
      const socket = io(SOCKET_URL, {
        autoConnect: false,
        transports: ['websocket', 'polling'],
        query: { token },
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
      });

      socket.on('connect', () => {
        setIsConnected(true);
        console.log('[Socket] Connected:', socket.id);
      });

      socket.on('disconnect', (reason) => {
        setIsConnected(false);
        console.log('[Socket] Disconnected:', reason);
      });

      socket.on('connect_error', (error) => {
        console.error('[Socket] Connection error:', error.message);
        setIsConnected(false);
      });

      socket.connect();
      socketRef.current = socket;

      return () => {
        socket.removeAllListeners();
        socket.disconnect();
        socketRef.current = null;
        setIsConnected(false);
      };
    } else {
      if (socketRef.current) {
        socketRef.current.removeAllListeners();
        socketRef.current.disconnect();
        socketRef.current = null;
        setIsConnected(false);
      }
    }
  }, [isAuthenticated, user]);

  const getSocket = useCallback(() => socketRef.current, []);

  const value = {
    socket: socketRef.current,
    getSocket,
    isConnected,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}

export function useSocketContext() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocketContext must be used within a SocketProvider');
  }
  return context;
}

export default SocketContext;

// Deployment commit
