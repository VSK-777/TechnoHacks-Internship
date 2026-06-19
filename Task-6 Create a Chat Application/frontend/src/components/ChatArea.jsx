import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiInfo, FiHash, FiSearch, FiMessageSquare, FiEdit2 } from 'react-icons/fi';
import { useChat } from '../hooks/useChat';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';

const ChatArea = ({ onToggleRightPanel, onOpenEditRoom }) => {
  const { currentRoom, messages, isTyping } = useChat();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  if (!currentRoom) return null;

  return (
    <div className="flex flex-col h-full bg-slate-50/50 backdrop-blur-sm z-10 w-full relative">
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 bg-white">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <FiHash className="text-cyan-400 w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              {currentRoom.name}
            </h2>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                {currentRoom.users?.length || 0} participants
              </span>
              {currentRoom.description && (
                <>
                  <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                  <span className="truncate max-w-[200px]">{currentRoom.description}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenEditRoom}
            className="p-2.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
            title="Edit Room"
          >
            <FiEdit2 className="w-5 h-5" />
          </button>
          <button 
            onClick={onToggleRightPanel}
            className="p-2.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
            title="Room Info"
          >
            <FiInfo className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-10 opacity-70">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <FiMessageSquare className="w-8 h-8 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Welcome to #{currentRoom.name}</h3>
            <p className="text-slate-500 max-w-sm">
              This is the beginning of the conversation. Send a message to start chatting!
            </p>
          </div>
        )}

        {messages.map((msg, index) => {
          const isConsecutive = index > 0 && messages[index - 1].senderId === msg.senderId;
          return (
            <MessageBubble 
              key={msg.id || index} 
              message={msg} 
              isConsecutive={isConsecutive} 
            />
          );
        })}
        
        {isTyping && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-slate-500 text-sm ml-12"
          >
            <TypingIndicator />
            <span>Someone is typing...</span>
          </motion.div>
        )}
        <div ref={messagesEndRef} className="h-1" />
      </div>

      <div className="p-4 bg-transparent">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatArea;
