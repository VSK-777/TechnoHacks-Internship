import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiPaperclip, FiSmile, FiMic } from 'react-icons/fi';
import { useChat } from '../hooks/useChat';
import { useSocket } from '../hooks/useSocket';
import EmojiPicker from './EmojiPicker';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const { sendMessage, currentRoom } = useChat();
  const { emitTyping } = useSocket();
  const inputRef = useRef(null);
  let typingTimeout = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && currentRoom) {
      sendMessage(message);
      setMessage('');
      if (inputRef.current) inputRef.current.style.height = '44px';
      if (emitTyping) emitTyping(currentRoom.id, false);
      setShowEmojis(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + 'px';
    }
    
    if (currentRoom && emitTyping) {
      emitTyping(currentRoom.id, true);
      
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
      typingTimeout.current = setTimeout(() => {
        emitTyping(currentRoom.id, false);
      }, 2000);
    }
  };

  const onEmojiClick = (emojiObj) => {
    setMessage(prev => prev + emojiObj.emoji);
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {showEmojis && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full mb-4 left-0 z-50 shadow-2xl"
          >
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </motion.div>
        )}
      </AnimatePresence>

      <form 
        onSubmit={handleSubmit}
        className="flex items-end gap-2 bg-slate-100 backdrop-blur-xl border border-slate-200 p-2 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
      >
        <div className="flex-1 max-h-32 overflow-y-auto custom-scrollbar relative flex items-center">
          <textarea
            ref={inputRef}
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="w-full bg-transparent text-slate-900 placeholder-gray-500 outline-none resize-none py-3 px-2 text-sm"
            rows="1"
            style={{ minHeight: '44px' }}
          />
        </div>

        <button 
          type="button"
          onClick={() => setShowEmojis(!showEmojis)}
          className={`p-3 transition-colors rounded-xl hover:bg-slate-100 ${showEmojis ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-500 hover:text-cyan-400'}`}
        >
          <FiSmile className="w-5 h-5" />
        </button>

        <button 
          type="submit"
          className={`p-3 rounded-xl transition-all transform active:scale-95 ${message.trim() ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-900 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
          disabled={!message.trim()}
        >
          <FiSend className="w-5 h-5 ml-0.5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
