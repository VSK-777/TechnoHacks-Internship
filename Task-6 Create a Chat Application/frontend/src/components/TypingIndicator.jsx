import React from 'react';
import { motion } from 'framer-motion';

const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-1 px-3 py-2 bg-slate-100 border border-slate-200 rounded-2xl rounded-bl-sm w-fit">
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
        className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
      />
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
        className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
      />
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
        className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
      />
    </div>
  );
};

export default TypingIndicator;
