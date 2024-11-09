import React, { useState } from 'react';
import { Icons } from './Icons';

interface ControlsProps {
  onToggleChat: () => void;
  isChatVisible: boolean;
}

export function Controls({ onToggleChat, isChatVisible }: ControlsProps) {
  const [volume, setVolume] = useState(80);

  return (
    <div className="absolute right-2 md:right-4 bottom-2 md:bottom-4 flex items-center space-x-2 md:space-x-4 bg-gray-900/80 px-2 md:px-4 py-2 rounded-lg transition-all duration-300">
      <button className="p-1 md:p-2 hover:bg-gray-800 rounded">
        <Icons.Volume2 size={16} className="text-[#fd5200] md:w-5 md:h-5" />
      </button>
      <div className="w-16 md:w-24">
        <input
          type="range"
          className="w-full accent-[#fd5200]"
          value={volume}
          onChange={(e) => setVolume(parseInt(e.target.value))}
        />
      </div>
      <button 
        className={`p-1 md:p-2 hover:bg-gray-800 rounded ${isChatVisible ? 'bg-gray-800' : ''}`}
        onClick={onToggleChat}
      >
        <Icons.MessageSquare size={16} className="text-[#fd5200] md:w-5 md:h-5" />
      </button>
      <button className="p-1 md:p-2 hover:bg-gray-800 rounded">
        <Icons.Maximize size={16} className="text-[#fd5200] md:w-5 md:h-5" />
      </button>
    </div>
  );
}