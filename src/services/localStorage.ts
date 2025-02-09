import { Chat, Folder } from '../types';

const STORAGE_KEYS = {
  CHATS: 'score_ai_chats',
  FOLDERS: 'score_ai_folders',
  SETTINGS: 'score_ai_settings'
};

export const storage = {
  saveChats: (chats: Chat[]) => {
    localStorage.setItem(STORAGE_KEYS.CHATS, JSON.stringify(chats));
  },

  getChats: (): Chat[] => {
    const chats = localStorage.getItem(STORAGE_KEYS.CHATS);
    return chats ? JSON.parse(chats) : [];
  },

  saveFolders: (folders: Folder[]) => {
    localStorage.setItem(STORAGE_KEYS.FOLDERS, JSON.stringify(folders));
  },

  getFolders: (): Folder[] => {
    const folders = localStorage.getItem(STORAGE_KEYS.FOLDERS);
    return folders ? JSON.parse(folders) : [];
  },

  clearAll: () => {
    localStorage.removeItem(STORAGE_KEYS.CHATS);
    localStorage.removeItem(STORAGE_KEYS.FOLDERS);
  }
}; 