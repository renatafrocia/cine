import React, { useState } from 'react';
import { TwitchEmbed } from 'react-twitch-embed';
import { Header } from './components/Header';
import { UserList } from './components/UserList';
import { Controls } from './components/Controls';
import { SettingsModal } from './components/SettingsModal';
import { ChatSection } from './components/ChatSection';

function App() {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentServer, setCurrentServer] = useState('Twitch Opción 1');

  const toggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col">
      <Header 
        onOpenSettings={() => setIsSettingsOpen(true)}
        currentServer={currentServer}
      />
      
      <main className="flex-1 relative">
        <div className="absolute inset-0 flex">
          <div className={`flex-1 transition-all duration-300 ${isChatVisible ? 'mr-[30%]' : ''}`}>
            <TwitchEmbed
              channel="cinevoxero"
              width="100%"
              height="100%"
              withChat={false}
              theme="dark"
            />
          </div>
          
          <ChatSection 
            channel="cinevoxero"
            isVisible={isChatVisible}
            onClose={toggleChat}
          />
        </div>
        
        <div className="absolute inset-0 pointer-events-none">
          <div className="h-full w-full flex flex-col justify-between p-4">
            <div className="pointer-events-auto">
              {/* Room info could go here */}
            </div>
            
            <div className="pointer-events-auto flex justify-between items-end">
              <UserList channel="cinevoxero" />
              <Controls onToggleChat={toggleChat} isChatVisible={isChatVisible} />
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

export default App;