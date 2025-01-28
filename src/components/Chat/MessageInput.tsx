import React from 'react';
import { IoSparkles } from 'react-icons/io5';
import { ArrowRight, Square } from 'lucide-react'; // Adicionei as importações

interface MessageInputProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  darkMode?: boolean;
  isLoading?: boolean;
  onCancel?: () => void;
  iconColor?: string;
}

export function MessageInput({
  prompt,
  onPromptChange,
  onSendMessage,
  onKeyPress,
  placeholder = "Digite sua mensagem aqui...",
  darkMode = false,
  isLoading = false,
  onCancel,
  iconColor = "text-green-500",
}: MessageInputProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <IoSparkles className={`w-5 h-5 ${iconColor}`} />
      </div>
      <input
        type="text"
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        disabled={isLoading}
        className={`w-full rounded-lg pl-12 pr-24 py-3 transition-all duration-300 ${
          darkMode 
            ? 'bg-[#1a1a1a] text-gray-200 placeholder-gray-500' 
            : 'bg-white text-black placeholder-gray-500'
        } focus:outline-none ${
          isLoading ? 'opacity-80' : ''
        }`}
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
        <button 
          onClick={isLoading ? onCancel : onSendMessage}
          disabled={isLoading && !onCancel}
          className={`flex items-center justify-center w-9 h-9 bg-green-500 rounded-md transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-green-500/20 ${
            isLoading 
              ? 'hover:bg-green-600 group' 
              : 'hover:bg-green-600'
          }`}
        >
          {isLoading ? (
            <div className="relative p-2 bg-green-600/30 rounded-md transition-all duration-300 group-hover:bg-green-600/50">
              <Square 
                className="w-4 h-4 text-white transition-all duration-300 animate-pulse group-hover:scale-90 group-hover:rotate-90" 
              />
            </div>
          ) : (
            <ArrowRight className="w-5 h-5 text-white transition-all duration-300 group-hover:translate-x-0.5" />
          )}
        </button>
      </div>
    </div>
  );
}