import React, { useState, useEffect } from 'react';

interface LoadingMessageProps {
  onExited?: () => void;
  isCanceling?: boolean;
}

export function LoadingMessage({ onExited, isCanceling }: LoadingMessageProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isCanceling) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        onExited?.();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isCanceling, onExited]);

  return (
    <div className={`flex justify-start transition-all duration-300 ${
      isExiting ? 'opacity-0 translate-y-2' : 'animate-fadeIn'
    }`}>
      <div className={`px-4 py-3 bg-[#252525] rounded-xl transition-all duration-300 ${
        isExiting ? 'opacity-0 scale-95' : 'animate-slideIn'
      }`}>
        <div className="flex space-x-1.5">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
} 