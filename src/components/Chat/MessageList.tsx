import React from 'react';
import { Message } from '../../types';
import { LoadingMessage } from './LoadingMessage';

interface MessageListProps {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
  isLoading?: boolean;
  isCanceling?: boolean;
}

export function MessageList({ messages, messagesEndRef, isLoading, isCanceling }: MessageListProps) {
  return (
    <div className="flex-1 space-y-4 mb-4 overflow-y-auto">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
        >
          <div
            className={`relative max-w-[70%] rounded-2xl p-3 animate-slideIn ${
              message.role === 'user'
                ? 'bg-green-500 text-black'
                : 'bg-[#252525] text-gray-200'
            }`}
          >
            <p className="text-sm">{message.content}</p>
            <span className="text-xs opacity-70 mt-1 block">
              {message.createdAt.toLocaleTimeString()}
            </span>
          </div>
        </div>
      ))}
      {isLoading && <LoadingMessage isCanceling={isCanceling} />}
      <div ref={messagesEndRef} />
    </div>
  );
}