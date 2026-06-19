import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiSend, FiCpu, FiTrash2 } from 'react-icons/fi';
import { useAI } from '../hooks/useAI';
import { useChat } from '../hooks/useChat';
import AIMessage from './AIMessage';

const AIAssistant = () => {
  const { closeAI } = useChat();
  const { messages, input, setInput, sendMessage, isLoading, clearHistory } = useAI();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-y-0 right-0 w-full sm:w-[400px] bg-white/95 backdrop-blur-xl border-l border-slate-200 z-50 flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
    >
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
            <FiCpu className="text-blue-600 w-5 h-5" />
          </div>
          <div>
            <h2 className="text-slate-900 font-bold text-lg">
              VSK AI
            </h2>
            <p className="text-[10px] text-slate-500 font-medium">POWERED BY GEMINI</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button 
              onClick={clearHistory}
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              title="Clear History"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={closeAI}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center opacity-70">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6">
              <FiCpu className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">How can I help you?</h3>
            <p className="text-sm text-slate-500 max-w-[250px]">
              Ask me anything about your projects, code, or general knowledge.
            </p>
            
            <div className="mt-8 space-y-2 w-full">
              {['Explain React Hooks', 'Write a Python script', 'Summarize my messages'].map((suggestion, i) => (
                <button 
                  key={i}
                  onClick={() => { setInput(suggestion); }}
                  className="w-full p-3 text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-all text-left flex items-center justify-between group"
                >
                  <span>{suggestion}</span>
                  <FiSend className="w-4 h-4 opacity-0 group-hover:opacity-100 text-cyan-400 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, idx) => (
          <AIMessage key={idx} message={msg} />
        ))}
        
        {isLoading && (
          <div className="flex items-center gap-3 text-slate-500 p-2">
            <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
              <FiCpu className="w-4 h-4 text-blue-600 animate-pulse" />
            </div>
            <div className="flex gap-1">
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-1" />
      </div>

      <div className="p-4 border-t border-slate-200 bg-white">
        <form 
          onSubmit={handleSubmit}
          className="relative flex items-end bg-white border border-slate-200 rounded-2xl p-1.5 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all shadow-sm"
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message VSK AI..."
            className="w-full bg-transparent text-slate-900 placeholder-slate-400 outline-none resize-none py-3 px-3 text-sm max-h-32 overflow-y-auto custom-scrollbar"
            rows="1"
            style={{ minHeight: '44px' }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-0.5 mr-0.5"
          >
            <FiSend className="w-4 h-4" />
          </button>
        </form>
        <div className="text-center mt-2">
          <span className="text-[10px] text-slate-400">AI can make mistakes. Consider verifying important information.</span>
        </div>
      </div>
    </motion.div>
  );
};

export default AIAssistant;
