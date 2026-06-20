import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import { SOCKET_URL } from '../utils/constants';
import { useAuth } from './AuthContext';

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [socketInstance, setSocketInstance] = useState(null);

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
      setSocketInstance(socket);

      return () => {
        socket.removeAllListeners();
        socket.disconnect();
        setSocketInstance(null);
        setIsConnected(false);
      };
    } else {
      setSocketInstance(prev => {
        if (prev) {
          prev.removeAllListeners();
          prev.disconnect();
        }
        return null;
      });
      setIsConnected(false);
    }
  }, [isAuthenticated, user]);

  const getSocket = useCallback(() => socketInstance, [socketInstance]);

  const value = {
    socket: socketInstance,
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
