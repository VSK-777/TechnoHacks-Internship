import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiHash, FiSave, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { updateRoom, deleteRoom } from '../api/rooms';
import { useChat } from '../contexts/ChatContext';

const EditRoomModal = ({ isOpen, onClose, room }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { updateRoomDetails, removeRoom } = useChat();

  useEffect(() => {
    if (room && isOpen) {
      setName(room.name || '');
      setDescription(room.description || '');
    }
  }, [room, isOpen]);

  if (!isOpen || !room) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);
    try {
      const updated = await updateRoom(room.id, name.trim(), description.trim());
      updateRoomDetails(updated);
      toast.success('Room updated successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to update room');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${room.name}? This action cannot be undone.`)) {
      setIsDeleting(true);
      try {
        await deleteRoom(room.id);
        removeRoom(room.id);
        toast.success('Room deleted successfully');
        onClose();
      } catch (error) {
        toast.error('Failed to delete room');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-xl z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <FiHash className="text-cyan-500" /> Edit Room
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Room Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    placeholder="e.g. general"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Description (Optional)</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none"
                    placeholder="What's this room about?"
                  />
                </div>

                <div className="flex gap-3 pt-4 border-t border-slate-100 mt-6">
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isDeleting || isLoading}
                    className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors flex items-center gap-2 mr-auto"
                  >
                    {isDeleting ? 'Deleting...' : <><FiTrash2 /> Delete</>}
                  </button>
                  
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || !name.trim()}
                    className="px-6 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isLoading ? 'Saving...' : <><FiSave /> Save</>}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EditRoomModal;
