import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { UserList } from './UserList';
import { Controls } from './Controls';
import { SettingsModal } from './SettingsModal';
import { ChatSection } from './ChatSection';
import { TwitchPlayer } from './TwitchPlayer';

const CHANNEL = 'cinevoxero';

export default function StreamView() {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentServer, setCurrentServer] = useState('Twitch');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsChatVisible(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleChat = () => setIsChatVisible(!isChatVisible);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col">
      <Header 
        onOpenSettings={() => setIsSettingsOpen(true)}
        currentServer={currentServer}
      />
      
      <main className="flex-1 relative">
        <div className="absolute inset-0 flex flex-col md:flex-row">
          <div className={`relative transition-all duration-300 ${
            isChatVisible && !isMobile ? 'md:w-[70%]' : 'w-full'
          } ${isChatVisible && isMobile ? 'h-[45vh]' : 'h-full'}`}>
            <TwitchPlayer channel={CHANNEL} currentServer={currentServer} />
          </div>
          
          <ChatSection 
            channel={CHANNEL}
            isVisible={isChatVisible}
            onClose={toggleChat}
            isMobile={isMobile}
          />
        </div>
        
        <div className="absolute inset-0 pointer-events-none">
          <div className="h-full w-full flex flex-col justify-between p-4">
            <div className="pointer-events-auto flex justify-end">
              {!isMobile && <Controls onToggleChat={toggleChat} isChatVisible={isChatVisible} />}
            </div>
            <div className="pointer-events-auto">
              {!isMobile && <UserList />}
            </div>
          </div>
        </div>
      </main>

      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentServer={currentServer}
        onServerChange={setCurrentServer}
      />
    </div>
  );
}