import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiCpu } from 'react-icons/fi';

const AIMessage = ({ message }) => {
  const isAI = message.role === 'assistant';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isAI ? '' : 'flex-row-reverse'}`}
    >
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-auto mb-1 ${
        isAI 
          ? 'bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/20 text-purple-400' 
          : 'bg-gradient-to-br from-cyan-500 to-blue-500 text-slate-900 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
      }`}>
        {isAI ? <FiCpu className="w-4 h-4" /> : <FiUser className="w-4 h-4" />}
      </div>

      <div className={`max-w-[85%] ${isAI ? 'items-start' : 'items-end flex flex-col'}`}>
        {isAI && (
          <span className="text-xs text-purple-400 mb-1 ml-1 font-medium tracking-wider">VSK AI</span>
        )}

        <div className={`relative px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isAI 
            ? 'bg-slate-100 border border-slate-200 text-gray-200 rounded-bl-sm backdrop-blur-sm' 
            : 'bg-gradient-to-br from-cyan-600 to-blue-600 text-slate-900 rounded-br-sm shadow-[0_4px_15px_rgba(6,182,212,0.2)]'
        }`}>
          <div className="prose prose-invert max-w-none prose-p:my-1 prose-pre:bg-black/50 prose-pre:border prose-pre:border-slate-200 prose-pre:rounded-xl">
            {message.content.split('\n').map((line, i) => {
              if (line.startsWith('```')) {
                return <div key={i} className="my-2 h-2 w-full bg-slate-200 rounded"></div>;
              }
              const formattedLine = line.split(/(\*\*.*?\*\*)/).map((part, j) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return <strong key={j} className="text-slate-900">{part.slice(2, -2)}</strong>;
                }
                return part;
              });
              
              return <p key={i} className="min-h-[1em]">{formattedLine}</p>;
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AIMessage;
