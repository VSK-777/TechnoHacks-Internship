import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCpu } from 'react-icons/fi';
import { useChat } from '../hooks/useChat';

const AIFloatingButton = () => {
  const { isAIOpen, openAI } = useChat();

  return (
    <AnimatePresence>
      {!isAIOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={openAI}
          className="fixed bottom-32 right-8 z-40 w-14 h-14 rounded-full bg-white shadow-xl border border-slate-200 flex items-center justify-center text-blue-600 hover:text-blue-700 hover:shadow-2xl transition-all"
        >
          <FiCpu className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default AIFloatingButton;
