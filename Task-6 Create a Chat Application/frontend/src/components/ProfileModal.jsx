import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiUser, FiMail, FiLogOut, FiEdit2, FiCheck } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import Avatar from './Avatar';

const ProfileModal = ({ onClose }) => {
  const { user, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (name.trim() === user?.name || !name.trim()) {
      setIsEditing(false);
      return;
    }

    setIsLoading(true);
    try {
      await updateProfile({ name });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-sm bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="relative h-32 bg-gradient-to-r from-cyan-600 to-purple-600">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-black/20 text-slate-900 hover:bg-white backdrop-blur-md transition-colors z-10"
          >
            <FiX className="w-5 h-5" />
          </button>
          
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 p-1.5 bg-white rounded-2xl shadow-sm">
            <Avatar user={user} size="xl" showStatus={true} />
          </div>
        </div>

        <div className="pt-14 pb-6 px-6 text-center">
          {isEditing ? (
            <div className="flex items-center gap-2 justify-center mb-1">
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-900 text-center text-lg font-bold w-48 focus:outline-none focus:border-cyan-500/50"
                autoFocus
              />
              <button 
                onClick={handleSave}
                disabled={isLoading}
                className="p-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
              >
                {isLoading ? <div className="w-4 h-4 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" /> : <FiCheck className="w-4 h-4" />}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 justify-center mb-1">
              <h2 className="text-xl font-bold text-slate-900">{user?.name}</h2>
              <button 
                onClick={() => setIsEditing(true)}
                className="p-1.5 text-slate-500 hover:text-cyan-400 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <FiEdit2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
          
          <p className="text-sm text-slate-500 flex items-center justify-center gap-1.5 mt-1">
            <FiMail className="w-3.5 h-3.5" />
            {user?.email}
          </p>

          <div className="mt-8 space-y-2">
            <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                Status
              </div>
              <span className="text-sm font-medium text-slate-900">Online</span>
            </div>
            
            <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <FiUser className="w-4 h-4" />
                </div>
                Member Since
              </div>
              <span className="text-sm font-medium text-slate-900">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}
              </span>
            </div>
          </div>

          <button 
            onClick={handleLogout}
            className="w-full mt-6 py-3 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl font-medium flex items-center justify-center gap-2 border border-red-500/20 transition-colors"
          >
            <FiLogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileModal;
