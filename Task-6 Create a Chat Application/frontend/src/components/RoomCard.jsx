import React from 'react';
import { motion } from 'framer-motion';
import { FiHash, FiLock } from 'react-icons/fi';

const RoomCard = ({ room, isActive, onClick }) => {
  return (
    <motion.button
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all text-left ${
        isActive 
          ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-slate-900 shadow-[0_0_15px_rgba(6,182,212,0.1)] border border-cyan-500/20' 
          : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
      }`}
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
        isActive ? 'bg-gradient-to-br from-cyan-500 to-blue-500 text-slate-900' : 'bg-slate-100 text-slate-400'
      }`}>
        <FiHash className="w-5 h-5" />
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold truncate flex items-center gap-1">
          {room.name}
          {room.private && <FiLock className="w-3 h-3 text-slate-400" />}
        </h4>
        {room.lastMessage && (
          <p className="text-xs text-slate-400 truncate mt-0.5">
            {room.lastMessage.content}
          </p>
        )}
      </div>

      {room.unreadCount > 0 && (
        <div className="w-5 h-5 rounded-full bg-cyan-500 text-slate-900 text-[10px] font-bold flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.5)]">
          {room.unreadCount}
        </div>
      )}
    </motion.button>
  );
};

export default RoomCard;
