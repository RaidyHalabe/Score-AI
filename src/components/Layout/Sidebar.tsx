import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Settings, Plus } from 'lucide-react';
import { RiRobot2Line } from 'react-icons/ri';

import { FolderItem } from '../Sidebar/FolderItem';
import { ChatItem } from '../Sidebar/ChatItem';
import { Folder, Chat } from '../../types';

interface SidebarProps {
  folders: Folder[];
  chats: Chat[];
  selectedFolder: string | null;
  activeDropdown: string | null;
  isCreatingFolder: boolean;
  newFolderName: string;
  editingChatId: string | null;
  editingChatTitle: string;
  createFolderRef: React.RefObject<HTMLDivElement>;
  dropdownRef: React.RefObject<HTMLDivElement>;
  editChatRef: React.RefObject<HTMLInputElement>;
  onFolderClick: (folderId: string) => void;
  onDeleteFolder: (folderId: string) => void;
  setActiveDropdown: (id: string | null) => void;
  setIsCreatingFolder: (value: boolean) => void;
  setNewFolderName: (value: string) => void;
  handleCreateFolder: () => void;
  handleMoreClick: (e: React.MouseEvent, chatId: string) => void;
  onRenameChat: (chatId: string) => void;
  setEditingChatTitle: (value: string) => void;
  handleNewChat: (addToFolder?: boolean) => void;
  onChatClick: (chat: Chat) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  setShowSettings: (value: boolean) => void;
}

export interface FolderItemProps {
  folder: Folder;
  selectedFolder: string | null;
  activeDropdown: string | null;
  onFolderClick: (id: string) => void;
  onDeleteFolder: (name: string) => void;
  setActiveDropdown: (id: string | null) => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
  onMoreClick: (e: React.MouseEvent) => void;
}

export function Sidebar({
  folders,
  chats,
  selectedFolder,
  activeDropdown,
  isCreatingFolder,
  newFolderName,
  editingChatId,
  editingChatTitle,
  createFolderRef,
  dropdownRef,
  editChatRef,
  onFolderClick,
  onDeleteFolder,
  setActiveDropdown,
  setIsCreatingFolder,
  setNewFolderName,
  handleCreateFolder,
  handleMoreClick,
  onRenameChat,
  setEditingChatTitle,
  handleNewChat,
  onChatClick,
  searchQuery,
  onSearchChange,
  setShowSettings,
}: SidebarProps) {
  const [showFolders, setShowFolders] = useState(true);
  const [showChats, setShowChats] = useState(true);
  const foldersRef = useRef<HTMLDivElement>(null);
  const chatsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (foldersRef.current) {
      foldersRef.current.style.height = showFolders 
        ? `${foldersRef.current.scrollHeight}px` 
        : '0';
    }
  }, [showFolders, folders, isCreatingFolder]);

  useEffect(() => {
    if (chatsRef.current) {
      chatsRef.current.style.height = showChats 
        ? `${chatsRef.current.scrollHeight}px` 
        : '0';
    }
  }, [showChats, chats]);

  return (
    <div className="w-80 flex flex-col h-[calc(100vh-2rem)] bg-[#1a1a1a] rounded-2xl overflow-hidden z-10 sticky top-4">
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-[#252525]">
        <div className="flex items-center space-x-2">
          <RiRobot2Line className="w-7 h-7 icon-sparkles-white" />
          <span className="font-medium text-sm text-gray-200">Minhas Conversas</span>
        </div>
        <button 
          onClick={() => setShowSettings(true)}
          className="p-1.5 hover:bg-[#252525] rounded-lg transition-colors"
        >
          <Settings className="w-4 h-4 text-gray-400 hover:text-green-500" />
        </button>
      </div>

      {/* Search */}
      <div className="px-3 py-2 border-b border-[#252525]">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Pesquisar chats e pastas..."
            className="w-full bg-[#252525] text-gray-300 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        </div>
      </div>

      {/* Folders Section */}
      <div className="px-3 py-2 border-b border-[#252525]">
        <div className="flex items-center justify-between mb-2">
          <button 
            onClick={() => setShowFolders(!showFolders)}
            className="flex items-center space-x-2 text-xs font-medium text-gray-400 hover:text-gray-300 transition-colors"
          >
            <div className="transition-transform duration-300" style={{ transform: showFolders ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
              <ChevronDown className="w-4 h-4" />
            </div>
            <span>Pastas</span>
          </button>
          <button 
            onClick={() => setIsCreatingFolder(true)}
            className="p-1 rounded-lg hover:bg-[#353535] text-gray-400 hover:text-gray-300 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <div 
          ref={foldersRef}
          className={`section-content ${showFolders ? 'expanded' : 'collapsed'}`}
        >
          <div className="space-y-1.5">
            {isCreatingFolder && (
              <div 
                ref={createFolderRef} 
                className="flex items-center space-x-2 p-2 bg-[#252525] rounded-lg animate-fadeIn"
              >
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Nome da pasta"
                  className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-500 focus:outline-none"
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateFolder()}
                  autoFocus
                />
                <button
                  onClick={handleCreateFolder}
                  className="text-green-500 hover:text-green-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}

            {folders.map((folder) => (
              <FolderItem
                key={folder.id}
                folder={folder}
                selectedFolder={selectedFolder}
                activeDropdown={activeDropdown}
                onFolderClick={onFolderClick}
                onDeleteFolder={onDeleteFolder}
                setActiveDropdown={setActiveDropdown}
                dropdownRef={dropdownRef}
                onMoreClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  handleMoreClick(e, folder.id);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Chats Section */}
      <div className="px-3 py-2 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-2">
          <button 
            onClick={() => setShowChats(!showChats)}
            className="flex items-center space-x-2 text-xs font-medium text-gray-400 hover:text-gray-300 transition-colors"
          >
            <div className="transition-transform duration-300" style={{ transform: showChats ? 'rotate(0deg)' : 'rotate(-90deg)' }}>
              <ChevronDown className="w-4 h-4" />
            </div>
            <span>Conversas</span>
          </button>
        </div>
        <div 
          ref={chatsRef}
          className={`section-content ${showChats ? 'expanded' : 'collapsed'}`}
        >
          <div className="space-y-1">
            {chats.map((chat) => (
              <div key={chat.id} onClick={() => onChatClick(chat)}>
                <ChatItem
                  chat={chat}
                  editingChatId={editingChatId}
                  editingChatTitle={editingChatTitle}
                  editChatRef={editChatRef}
                  onRenameChat={onRenameChat}
                  setEditingChatTitle={setEditingChatTitle}
                  handleMoreClick={handleMoreClick}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-3 border-t border-[#252525]">
        <button 
          onClick={() => handleNewChat(false)}
          className="group relative flex items-center justify-between w-full bg-green-500 hover:bg-green-600 text-black font-medium rounded-lg py-2.5 px-4 transition-colors"
        >
          <span>Nova conversa</span>
          <div className="flex items-center justify-center w-8 h-8 bg-white rounded-md">
            <Plus className="w-6 h-6" />
          </div>
        </button>
      </div>
    </div>
  );
}