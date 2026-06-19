import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';
import Avatar from './Avatar';

const MessageBubble = ({ message, isConsecutive }) => {
  const { user } = useAuth();
  const isMine = message.senderId === user?.id;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 max-w-[85%] ${isMine ? 'ml-auto flex-row-reverse' : ''} ${isConsecutive ? 'mt-1' : 'mt-4'}`}
    >
      {!isConsecutive && !isMine && (
        <div className="flex-shrink-0 mt-auto mb-1">
          <Avatar user={{ name: message.senderName, username: message.senderUsername }} size="sm" showStatus={false} />
        </div>
      )}
      {isConsecutive && !isMine && <div className="w-8 flex-shrink-0" />}

      <div className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
        {!isConsecutive && !isMine && message.senderName && (
          <span className="text-xs text-slate-500 mb-1 ml-1 font-medium">{message.senderName}</span>
        )}

        <div 
          className={`relative px-3 py-2 rounded-2xl shadow-sm flex flex-col ${
            isMine 
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-br-sm' 
              : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm'
          }`}
          style={{ minWidth: '80px' }}
        >
          <p className="whitespace-pre-wrap break-words leading-relaxed text-sm mb-3 pb-1">{message.content || message.message}</p>
          
          <div className={`absolute bottom-1.5 right-3 flex items-center gap-1 text-[10px] ${isMine ? 'text-blue-100' : 'text-slate-400'}`}>
            <span>{format(new Date(message.createdAt || message.timestamp || Date.now()), 'h:mm a')}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
