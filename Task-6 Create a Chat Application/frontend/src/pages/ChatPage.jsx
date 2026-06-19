import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import ChatArea from '../components/ChatArea';
import RightPanel from '../components/RightPanel';
import CreateRoomModal from '../components/CreateRoomModal';
import ProfileModal from '../components/ProfileModal';
import EditRoomModal from '../components/EditRoomModal';
import { useChat } from '../hooks/useChat';

const ChatPage = () => {
  const { currentRoom } = useChat();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditRoomOpen, setIsEditRoomOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden relative">
      <div className="absolute top-0 left-[20%] w-[40%] h-[40%] rounded-full bg-cyan-900/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-[20%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[150px] pointer-events-none" />

      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        onOpenCreateRoom={() => setIsCreateRoomOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      <motion.div 
        className="flex-1 flex flex-col h-full z-10 relative border-l border-slate-200 shadow-2xl"
        layout
      >
        {currentRoom ? (
          <ChatArea 
            onToggleRightPanel={() => setIsRightPanelOpen(!isRightPanelOpen)} 
            onOpenEditRoom={() => setIsEditRoomOpen(true)}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-24 h-24 mb-6 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-slate-200 shadow-[0_0_30px_rgba(6,182,212,0.15)]"
            >
              <svg className="w-12 h-12 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </motion.div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Select a Conversation</h2>
            <p className="text-slate-500 max-w-md">Choose an existing room or create a new one to start chatting with your team or AI assistant.</p>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {isRightPanelOpen && currentRoom && (
          <RightPanel onClose={() => setIsRightPanelOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCreateRoomOpen && (
          <CreateRoomModal onClose={() => setIsCreateRoomOpen(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isProfileOpen && (
          <ProfileModal onClose={() => setIsProfileOpen(false)} />
        )}
      </AnimatePresence>
      
      <EditRoomModal 
        isOpen={isEditRoomOpen} 
        onClose={() => setIsEditRoomOpen(false)} 
        room={currentRoom} 
      />
    </div>
  );
};

export default ChatPage;
