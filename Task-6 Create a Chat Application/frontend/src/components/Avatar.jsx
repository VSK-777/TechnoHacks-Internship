import React from 'react';
import UserStatusBadge from './UserStatusBadge';

const Avatar = ({ user, size = 'md', showStatus = false, overrideStatus = null }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-24 h-24 text-3xl'
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
  };

  const getColorClass = (name) => {
    if (!name) return 'from-gray-600 to-gray-500';
    
    const colors = [
      'from-cyan-500 to-blue-500',
      'from-purple-500 to-pink-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-red-500',
      'from-indigo-500 to-purple-500'
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  const displayName = user?.username || user?.name || '';

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <div className={`w-full h-full rounded-xl bg-gradient-to-br ${getColorClass(displayName)} flex items-center justify-center font-bold text-slate-900 shadow-md`}>
        {getInitials(displayName)}
      </div>
      
      {showStatus && (
        <div className="absolute -bottom-1 -right-1">
          <UserStatusBadge status={overrideStatus || 'online'} />
        </div>
      )}
    </div>
  );
};

export default Avatar;
