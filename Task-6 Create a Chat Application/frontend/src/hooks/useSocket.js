import { useCallback, useEffect, useRef } from 'react';
import { useSocketContext } from '../contexts/SocketContext';

export function useSocket() {
  const { socket, isConnected, getSocket } = useSocketContext();
  const listenersRef = useRef([]);

  const emit = useCallback(
    (event, data) => {
      const s = getSocket();
      if (s && s.connected) {
        s.emit(event, data);
      }
    },
    [getSocket]
  );

  const listen = useCallback(
    (event, handler) => {
      const s = getSocket();
      if (s) {
        s.on(event, handler);
        listenersRef.current.push({ event, handler });
      }
    },
    [getSocket]
  );

  const unlisten = useCallback(
    (event, handler) => {
      const s = getSocket();
      if (s) {
        s.off(event, handler);
        listenersRef.current = listenersRef.current.filter(
          (l) => l.event !== event || l.handler !== handler
        );
      }
    },
    [getSocket]
  );

  useEffect(() => {
    return () => {
      const s = getSocket();
      if (s) {
        listenersRef.current.forEach(({ event, handler }) => {
          s.off(event, handler);
        });
        listenersRef.current = [];
      }
    };
  }, [getSocket]);

  return {
    socket,
    isConnected,
    emit,
    listen,
    unlisten,
  };
}

export default useSocket;
