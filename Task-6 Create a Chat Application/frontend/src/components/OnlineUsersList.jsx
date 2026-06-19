import React from 'react';
import Avatar from './Avatar';
import { useSocket } from '../hooks/useSocket';

const OnlineUsersList = ({ users }) => {
  const { onlineUsers } = useSocket();

  if (!users || users.length === 0) return null;

  return (
    <div className="space-y-2">
      {users.map(user => {
        const isOnline = onlineUsers.includes(user._id);
        
        return (
          <div key={user._id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group">
            <Avatar user={user} size="sm" showStatus={true} overrideStatus={isOnline ? 'online' : 'offline'} />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-slate-900 truncate group-hover:text-cyan-400 transition-colors">
                {user.name}
              </h4>
              <p className="text-xs text-slate-400 truncate">
                {isOnline ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OnlineUsersList;
