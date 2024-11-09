import React from 'react';
import { Icons } from './Icons';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentServer: string;
  onServerChange: (server: string) => void;
}

const SERVERS = [
  'Twitch',
  'Ok.ru'
];

export function SettingsModal({ 
  isOpen, 
  onClose, 
  currentServer, 
  onServerChange 
}: SettingsModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-[#171b22] rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <button 
                onClick={onClose}
                className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
              >
                <Icons.X className="w-5 h-5" />
              </button>

              <h2 className="text-lg md:text-xl font-bold text-white mb-6">
                Configuración
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-base md:text-lg font-semibold mb-4 text-white">
                    Servidor de Streaming
                  </h3>
                  <div className="space-y-2">
                    {SERVERS.map((server) => (
                      <div
                        key={server}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                          currentServer === server 
                            ? 'bg-[#fd5200] text-white' 
                            : 'bg-gray-800/50 hover:bg-gray-800'
                        }`}
                        onClick={() => onServerChange(server)}
                      >
                        <span className="text-sm md:text-base">{server}</span>
                        {currentServer === server && (
                          <span className="text-xs md:text-sm">Actual</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-[#fd5200] text-white rounded text-sm md:text-base hover:bg-[#e64a00] transition-colors"
                  >
                    Listo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}