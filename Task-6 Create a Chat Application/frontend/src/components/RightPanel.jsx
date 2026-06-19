import React from 'react';
import { motion } from 'framer-motion';
import { FiX, FiUsers, FiFile, FiBell, FiShield, FiSearch } from 'react-icons/fi';
import { useChat } from '../hooks/useChat';
import OnlineUsersList from './OnlineUsersList';

const RightPanel = ({ onClose }) => {
  const { currentRoom } = useChat();

  if (!currentRoom) return null;

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 300, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="h-full bg-white border-l border-slate-200 z-20 flex flex-col overflow-hidden whitespace-nowrap"
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 bg-slate-50 shrink-0">
        <h3 className="font-semibold text-slate-900">Room Details</h3>
        <button 
          onClick={onClose}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
        <div className="text-center pb-6 border-b border-slate-200">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-slate-200 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
              {currentRoom.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-1 truncate">{currentRoom.name}</h2>
          {currentRoom.description && (
            <p className="text-sm text-slate-500 whitespace-normal">{currentRoom.description}</p>
          )}
        </div>

        <div className="grid grid-cols-4 gap-2 pb-6 border-b border-slate-200">
          {[
            { icon: FiBell, label: 'Mute' },
            { icon: FiSearch, label: 'Search' },
            { icon: FiUsers, label: 'Add' },
            { icon: FiShield, label: 'More' }
          ].map((action, i) => (
            <button key={i} className="flex flex-col items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-all">
                <action.icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] text-slate-400 group-hover:text-cyan-400">{action.label}</span>
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider flex items-center justify-between">
            <span>Shared Media</span>
            <button className="text-xs text-cyan-400 hover:underline">See All</button>
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-square rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer border border-slate-200 flex items-center justify-center">
                <FiFile className="w-6 h-6 text-slate-400" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 pt-6 border-t border-slate-200">
          <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiUsers className="w-4 h-4" />
              <span>Members</span>
            </div>
            <span className="text-xs bg-slate-200 px-2 py-0.5 rounded-full">{currentRoom.users?.length || 0}</span>
          </h3>
          <OnlineUsersList users={currentRoom.users} />
        </div>
      </div>
    </motion.div>
  );
};

export default RightPanel;
