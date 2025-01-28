import React from 'react';
import { User2 } from 'lucide-react';
import { RiRobot2Line } from 'react-icons/ri';

interface MessageProps {
  isAI?: boolean;
  children: React.ReactNode;
}

export function Message({ isAI = false, children }: MessageProps) {
  return (
    <div className={`flex items-start space-x-3 ${isAI ? 'bg-[#1a1a1a]' : ''} p-4 rounded-lg relative`}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        {isAI ? (
          <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
            <RiRobot2Line className="w-5 h-5 text-green-500" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-lg bg-[#252525] flex items-center justify-center">
            <User2 className="w-5 h-5 text-gray-400" />
          </div>
        )}
      </div>

      {/* Mensagem sem "cauda" */}
      <div className={`flex-1 relative ${isAI ? 'bg-[#252525]' : 'bg-green-500/10'} p-4 rounded-lg`}>
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
} 