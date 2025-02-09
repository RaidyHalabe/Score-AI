import { useState } from 'react';
import { Chat } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

export const useChats = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editingChatTitle, setEditingChatTitle] = useState('');
  const { t } = useLanguage();

  const handleNewChat = (addToFolder: boolean = false, selectedFolder: string | null = null) => {
    const newChat: Chat = {
      id: String(Date.now()),
      title: t('sidebar.newChat'),
      desc: t('sidebar.chatDescriptions.starting'),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setChats([newChat, ...chats]);
    setSelectedChat(newChat);
    
    return newChat;
  };

  const handleDeleteChat = (chatId: string) => {
    setChats(chats.filter(chat => chat.id !== chatId));
    if (selectedChat?.id === chatId) {
      setSelectedChat(null);
    }
  };

  const handleRenameChat = (chatId: string) => {
    if (editingChatTitle.trim()) {
      setChats(chats.map(chat => 
        chat.id === chatId 
          ? { ...chat, title: editingChatTitle.trim(), updatedAt: new Date() }
          : chat
      ));
      setEditingChatId(null);
      setEditingChatTitle('');
    }
  };

  return {
    chats,
    selectedChat,
    editingChatId,
    editingChatTitle,
    setChats,
    setSelectedChat,
    setEditingChatId,
    setEditingChatTitle,
    handleNewChat,
    handleDeleteChat,
    handleRenameChat
  };
}; 