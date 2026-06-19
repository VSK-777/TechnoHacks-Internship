import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMessageSquare, FiPlus, FiSettings, FiMenu, FiHash, FiUsers, FiTrash2 } from 'react-icons/fi';
import { useChat } from '../hooks/useChat';
import { useAuth } from '../contexts/AuthContext';
import RoomCard from './RoomCard';
import Avatar from './Avatar';

const Sidebar = ({ isOpen, setIsOpen, onOpenCreateRoom, onOpenProfile }) => {
  const { rooms, currentRoom, joinRoom } = useChat();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('rooms');

  return (
    <motion.div 
      initial={false}
      animate={{ 
        width: isOpen ? 320 : 80,
        transition: { duration: 0.3, ease: 'easeInOut' }
      }}
      className="h-full bg-white flex flex-col z-20 border-r border-slate-200 relative overflow-hidden"
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 bg-slate-50">
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex items-center gap-3 font-bold text-lg"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
              <FiMessageSquare className="text-slate-900 w-4 h-4" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-300">
              VSK CONNECT
            </span>
          </motion.div>
        )}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors mx-auto"
        >
          <FiMenu className="w-5 h-5" />
        </button>
      </div>

      {isOpen && (
        <div className="p-4 border-b border-slate-200">
          <div 
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 cursor-pointer transition-colors"
            onClick={onOpenProfile}
          >
            <Avatar user={user} size="md" showStatus={true} />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-slate-900 truncate">{user?.name}</h3>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
            <FiSettings className="text-slate-400 w-4 h-4" />
          </div>
        </div>
      )}

      {!isOpen && (
        <div className="flex flex-col items-center py-6 gap-6 flex-1">
          <div className="cursor-pointer" onClick={onOpenProfile}>
            <Avatar user={user} size="sm" showStatus={true} />
          </div>
          <div className="w-8 h-[1px] bg-slate-200 my-2"></div>
          <button 
            onClick={() => { setIsOpen(true); setActiveTab('rooms'); }}
            className={`p-3 rounded-xl transition-all ${activeTab === 'rooms' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
          >
            <FiHash className="w-5 h-5" />
          </button>
          <button 
            onClick={() => { setIsOpen(true); setActiveTab('dms'); }}
            className={`p-3 rounded-xl transition-all ${activeTab === 'dms' ? 'bg-purple-500/20 text-purple-400' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`}
          >
            <FiUsers className="w-5 h-5" />
          </button>
          <div className="mt-auto">
            <button 
              onClick={onOpenCreateRoom}
              className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-slate-900 shadow-lg shadow-cyan-500/20"
            >
              <FiPlus className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex p-3 gap-2">
            <button
              onClick={() => setActiveTab('rooms')}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'rooms' 
                  ? 'bg-blue-100 text-blue-700 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
              }`}
            >
              Public Rooms
            </button>
            <button
              onClick={async () => {
                setActiveTab('ai');
                try {
                  const { default: api } = await import('../api/axios');
                  const response = await api.get('/api/rooms/ai');
                  joinRoom(response.data);
                } catch (error) {
                  console.error('Failed to join AI room:', error);
                }
              }}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTab === 'ai' 
                  ? 'bg-blue-100 text-blue-700 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
              }`}
            >
              AI Chat
            </button>
          </div>

          {activeTab === 'rooms' && (
            <>
              <div className="px-4 py-2 flex items-center justify-between group">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Public Rooms
                </span>
                <button 
                  onClick={onOpenCreateRoom}
                  className="w-5 h-5 rounded flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  <FiPlus className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar px-2 pb-4 space-y-1">
                {rooms.filter(r => r.group).length === 0 ? (
                  <div className="p-4 text-center text-sm text-slate-400">
                    No public rooms available. Create one!
                  </div>
                ) : (
                  rooms.filter(r => r.group).map((room) => (
                    <RoomCard 
                      key={room.id} 
                      room={room} 
                      isActive={currentRoom?.id === room.id}
                      onClick={() => joinRoom(room)}
                    />
                  ))
                )}
              </div>
            </>
          )}

          {activeTab === 'ai' && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
                <FiMessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900 mb-1">Your Personal AI</h3>
              <p className="text-xs text-slate-500">
                Chat securely with your AI assistant. This conversation is 100% private.
              </p>
            </div>
          )}

          <div className="p-4 border-t border-slate-200 mt-auto">
            <button
              onClick={async () => {
                if (window.confirm('Are you sure you want to delete all chat rooms and messages?')) {
                  try {
                    const { default: api } = await import('../api/axios');
                    await api.delete('/api/rooms/clear-all');
                    window.location.reload();
                  } catch (error) {
                    console.error('Failed to clear chats:', error);
                  }
                }
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <FiTrash2 className="w-4 h-4" />
              Clear All Chats
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Sidebar;
