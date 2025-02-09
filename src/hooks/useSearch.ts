import { useState, useMemo } from 'react';
import { Chat, Folder } from '../types';

export const useSearch = (chats: Chat[], folders: Folder[]) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    const searchLower = searchQuery.toLowerCase();
    
    return {
      chats: chats.filter(chat => 
        chat.title.toLowerCase().includes(searchLower) ||
        chat.desc.toLowerCase().includes(searchLower)
      ),
      folders: folders.filter(folder => 
        folder.name.toLowerCase().includes(searchLower)
      )
    };
  }, [searchQuery, chats, folders]);

  return {
    searchQuery,
    setSearchQuery,
    filteredChats: filteredItems.chats,
    filteredFolders: filteredItems.folders
  };
}; 