// Twitch API configuration
const TWITCH_CLIENT_ID = import.meta.env.VITE_TWITCH_CLIENT_ID || '';
const TWITCH_ACCESS_TOKEN = import.meta.env.VITE_TWITCH_ACCESS_TOKEN || '';

export interface TwitchUser {
  id: string;
  login: string;
  display_name: string;
  profile_image_url: string;
}

export interface TwitchStream {
  id: string;
  user_id: string;
  user_name: string;
  viewer_count: number;
  started_at: string;
}

export interface TwitchChatMessage {
  id: string;
  user: {
    id: string;
    name: string;
    color: string;
  };
  message: string;
  timestamp: string;
}

class TwitchAPI {
  private static instance: TwitchAPI;
  private eventSource: EventSource | null = null;
  private messageHandlers: ((message: TwitchChatMessage) => void)[] = [];
  private viewerHandlers: ((count: number) => void)[] = [];

  private constructor() {}

  static getInstance(): TwitchAPI {
    if (!TwitchAPI.instance) {
      TwitchAPI.instance = new TwitchAPI();
    }
    return TwitchAPI.instance;
  }

  private async fetchWithAuth(url: string) {
    try {
      const response = await fetch(url, {
        headers: {
          'Client-ID': TWITCH_CLIENT_ID,
          'Authorization': `Bearer ${TWITCH_ACCESS_TOKEN}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('Error fetching from Twitch API:', error);
      throw error;
    }
  }

  async getStreamInfo(channelName: string): Promise<TwitchStream | null> {
    try {
      const data = await this.fetchWithAuth(
        `https://api.twitch.tv/helix/streams?user_login=${channelName}`
      );
      return data.data[0] || null;
    } catch (error) {
      console.error('Error fetching stream info:', error);
      return null;
    }
  }

  async getChannelViewers(channelName: string): Promise<number> {
    try {
      const stream = await this.getStreamInfo(channelName);
      return stream?.viewer_count || 0;
    } catch (error) {
      console.error('Error fetching viewer count:', error);
      return 0;
    }
  }

  async getChatters(channelName: string): Promise<TwitchUser[]> {
    try {
      const data = await this.fetchWithAuth(
        `https://api.twitch.tv/helix/chat/chatters?broadcaster_login=${channelName}`
      );
      return data.data || [];
    } catch (error) {
      console.error('Error fetching chatters:', error);
      return [];
    }
  }

  connectToChat(channelName: string) {
    if (this.eventSource) {
      this.eventSource.close();
    }

    // In a real implementation, you would connect to Twitch's IRC or WebSocket API
    // For demo purposes, we'll simulate messages
    setInterval(() => {
      const mockMessage: TwitchChatMessage = {
        id: Math.random().toString(36).substr(2, 9),
        user: {
          id: Math.random().toString(36).substr(2, 9),
          name: `User${Math.floor(Math.random() * 1000)}`,
          color: `#${Math.floor(Math.random()*16777215).toString(16)}`
        },
        message: `Message ${Math.floor(Math.random() * 100)}`,
        timestamp: new Date().toISOString()
      };
      
      this.messageHandlers.forEach(handler => handler(mockMessage));
    }, 3000);

    // Update viewer count every 30 seconds
    setInterval(async () => {
      const count = await this.getChannelViewers(channelName);
      this.viewerHandlers.forEach(handler => handler(count));
    }, 30000);
  }

  onChatMessage(handler: (message: TwitchChatMessage) => void) {
    this.messageHandlers.push(handler);
    return () => {
      this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
    };
  }

  onViewerCountUpdate(handler: (count: number) => void) {
    this.viewerHandlers.push(handler);
    return () => {
      this.viewerHandlers = this.viewerHandlers.filter(h => h !== handler);
    };
  }

  disconnect() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
    this.messageHandlers = [];
    this.viewerHandlers = [];
  }
}

export const twitchAPI = TwitchAPI.getInstance();