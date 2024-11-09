import React, { useState, useEffect } from 'react';
import { TwitchEmbed } from 'react-twitch-embed';

interface TwitchPlayerProps {
  channel: string;
  currentServer: string;
}

export function TwitchPlayer({ channel, currentServer }: TwitchPlayerProps) {
  const [useTwitch, setUseTwitch] = useState(currentServer === 'Twitch');
  
  useEffect(() => {
    // If Ok.ru is selected, don't check Twitch status
    if (currentServer === 'Ok.ru') {
      setUseTwitch(false);
      return;
    }

    const checkStream = async () => {
      try {
        const response = await fetch(`https://api.twitch.tv/helix/streams?user_login=${channel}`, {
          headers: {
            'Client-ID': import.meta.env.VITE_TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${import.meta.env.VITE_TWITCH_ACCESS_TOKEN}`
          }
        });
        
        if (!response.ok) {
          setUseTwitch(false);
          return;
        }
        
        const data = await response.json();
        setUseTwitch(data.data && data.data.length > 0 && data.data[0].type === 'live');
      } catch (error) {
        console.error('Error checking stream:', error);
        setUseTwitch(false);
      }
    };

    // Check immediately on mount
    checkStream();
    
    // Check every minute if Twitch is selected
    const interval = setInterval(checkStream, 60000);
    
    return () => clearInterval(interval);
  }, [channel, currentServer]);

  if (!useTwitch) {
    return (
      <div className="w-full h-full bg-black">
        <iframe
          src="//ok.ru/videoembed/7682591825651?nochat=1"
          frameBorder="0"
          allow="autoplay"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <TwitchEmbed
        channel={channel}
        width="100%"
        height="100%"
        withChat={false}
        theme="dark"
        muted
      />
    </div>
  );
}