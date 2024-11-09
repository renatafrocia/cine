import React, { useEffect, useState } from 'react';
import { Icons } from './Icons';
import { userCountStore } from '../utils/userCount';

interface UserListProps {
  mobileHeader?: boolean;
}

export function UserList({ mobileHeader = false }: UserListProps) {
  const [viewerCount, setViewerCount] = useState(0);
  
  useEffect(() => {
    // Generate a random user ID for this session
    const userId = Math.random().toString(36).substring(7);
    
    // Add user when component mounts
    setViewerCount(userCountStore.addUser(userId));
    
    // Set up interval to refresh count
    const interval = setInterval(() => {
      setViewerCount(userCountStore.getCount());
    }, 5000);
    
    // Remove user when component unmounts
    return () => {
      clearInterval(interval);
      userCountStore.removeUser(userId);
    };
  }, []);

  if (mobileHeader) {
    return (
      <div className="flex items-center space-x-1">
        <Icons.Users size={14} className="text-[#fd5200]" />
        <span className="text-xs font-medium text-gray-300">{viewerCount}</span>
      </div>
    );
  }

  return (
    <div className="absolute bottom-4 left-4 bg-gray-900/80 rounded-lg p-2">
      <div className="flex items-center space-x-2">
        <Icons.Users size={16} className="text-[#fd5200]" />
        <span className="text-sm font-medium">{viewerCount}</span>
      </div>
    </div>
  );
}