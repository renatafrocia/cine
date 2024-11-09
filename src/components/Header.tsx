import React from 'react';
import { Icons } from './Icons';
import { UserList } from './UserList';

interface HeaderProps {
  onOpenSettings: () => void;
  currentServer: string;
}

export function Header({ onOpenSettings, currentServer }: HeaderProps) {
  return (
    <header className="bg-[#171b22] text-white py-2 px-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <h1 className="text-lg md:text-xl title-font bg-gradient-to-r from-[#fd5200] to-[#ff7e00] text-transparent bg-clip-text">
          Cine Voxero
        </h1>
        <div className="hidden md:block text-sm text-gray-400">
          Conectado a: {currentServer}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="md:hidden">
          <UserList mobileHeader />
        </div>
        <button
          onClick={onOpenSettings}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Icons.Settings className="w-5 h-5 text-[#fd5200]" />
        </button>
      </div>
    </header>
  );
}