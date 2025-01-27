import React from 'react';
import { Brain, Mic, ArrowRight } from 'lucide-react';

interface MessageInputProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  darkMode?: boolean;
}

export function MessageInput({
  prompt,
  onPromptChange,
  onSendMessage,
  onKeyPress,
  placeholder = "Digite sua mensagem aqui...",
  darkMode = false,
}: MessageInputProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <Brain className="w-5 h-5 text-green-500" />
      </div>
      <input
        type="text"
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        className={`w-full rounded-lg pl-12 pr-24 py-3 ${
          darkMode 
            ? 'bg-[#1a1a1a] text-gray-200 placeholder-gray-500' 
            : 'bg-white text-black placeholder-gray-500'
        } focus:outline-none focus:ring-1 focus:ring-green-500`}
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
        <button className="p-2 hover:bg-[#252525] rounded-lg transition-colors">
          <Mic className="w-5 h-5 text-gray-400 hover:text-green-500 transition-colors" />
        </button>
        <button 
          onClick={onSendMessage}
          className="flex items-center justify-center w-9 h-9 bg-green-500 rounded-md hover:bg-green-600 transition-colors"
        >
          <ArrowRight className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}