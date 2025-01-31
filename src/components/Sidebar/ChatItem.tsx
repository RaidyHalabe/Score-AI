import React from 'react';
import { MessageSquare, MoreVertical } from 'lucide-react';
import { Chat } from '../../types';

interface ChatItemProps {
  chat: Chat;
  editingChatId: string | null;
  editingChatTitle: string;
  editChatRef: React.RefObject<HTMLInputElement>;
  onRenameChat: (id: string) => void;
  setEditingChatTitle: (title: string) => void;
  handleMoreClick: (e: React.MouseEvent, id: string) => void;
}

export function ChatItem({
  chat,
  editingChatId,
  editingChatTitle,
  editChatRef,
  onRenameChat,
  setEditingChatTitle,
  handleMoreClick,
}: ChatItemProps) {
  return (
    <div className="group flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-[#252525] transition-all duration-200">
      <div className="flex items-center space-x-2.5 flex-1 min-w-0">
        <div className="flex items-center justify-center w-6 h-6 rounded bg-[#252525] group-hover:bg-[#353535] transition-colors">
          <MessageSquare className="w-4 h-4 text-green-500" />
        </div>
        <div className="flex-1 min-w-0">
          {editingChatId === chat.id ? (
            <input
              ref={editChatRef}
              type="text"
              value={editingChatTitle}
              onChange={(e) => setEditingChatTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onRenameChat(chat.id)}
              onBlur={() => onRenameChat(chat.id)}
              className="w-full bg-transparent text-sm text-gray-200 focus:outline-none border border-green-500 rounded px-2 py-0.5"
              autoFocus
            />
          ) : (
            <>
              <div className="text-sm font-medium text-gray-300 truncate group-hover:text-gray-200 transition-colors">
                {chat.title}
              </div>
              <div className="text-xs text-gray-500 truncate mt-0.5 group-hover:text-gray-400 transition-colors">
                {chat.desc}
              </div>
            </>
          )}
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleMoreClick(e, chat.id);
        }}
        className="p-1.5 rounded-lg hover:bg-[#353535] text-gray-400 hover:text-green-500 
          transition-all duration-200 opacity-60 hover:opacity-100 relative z-10"
      >
        <MoreVertical className="w-4 h-4" />
      </button>
    </div>
  );
}