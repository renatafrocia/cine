import React, { useState } from 'react';
import { Icons } from './Icons';

interface ChatSectionProps {
  channel: string;
  isVisible: boolean;
  onClose: () => void;
  isMobile?: boolean;
}

export function ChatSection({ 
  channel, 
  isVisible, 
  onClose,
  isMobile = false 
}: ChatSectionProps) {
  const [showRegisterBanner, setShowRegisterBanner] = useState(true);

  if (!isVisible) return null;

  return (
    <div 
      className={`bg-[#0f0f0f] flex flex-col ${
        isMobile 
          ? 'h-[55vh] w-full' 
          : 'w-[30%]'
      }`}
    >
      {showRegisterBanner && (
        <div className="relative bg-[#171b22] p-3 text-sm">
          <button
            onClick={() => setShowRegisterBanner(false)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <Icons.X className="w-4 h-4" />
          </button>
          <a 
            href={`https://www.twitch.tv/signup`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#fd5200] hover:text-[#e64a00] transition-colors"
          >
            Register on Twitch to participate in chat and interact with streamers!
          </a>
        </div>
      )}

      <div className="flex-1 relative">
        <iframe
          src={`https://www.twitch.tv/embed/${channel}/chat?parent=${window.location.hostname}&darkpopout`}
          width="100%"
          height="100%"
          className="border-0"
        />
      </div>
    </div>
  );
}