import React from 'react';

const UserStatusBadge = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'offline':
        return 'bg-gray-500';
      case 'away':
        return 'bg-yellow-500';
      case 'busy':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className={`w-3.5 h-3.5 rounded-full border-2 border-white ${getStatusColor()} flex items-center justify-center`}>
      {status === 'away' && <div className="w-1.5 h-1.5 rounded-full bg-white opacity-50" />}
      {status === 'busy' && <div className="w-2 h-0.5 rounded-full bg-white" />}
    </div>
  );
};

export default UserStatusBadge;
