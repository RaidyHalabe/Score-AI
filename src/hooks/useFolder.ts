// Hook personalizado para lógica de pastas
import { useState } from 'react';
import { Folder } from '../types';

export const useFolder = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;

    const newFolder: Folder = {
      id: Date.now().toString(),
      name: newFolderName.trim(),
      chats: []
    };

    setFolders([...folders, newFolder]);
    setNewFolderName('');
    setIsCreatingFolder(false);
  };

  const handleDeleteFolder = (folderId: string) => {
    setFolders(folders.filter(f => f.id !== folderId));
    if (selectedFolder === folderId) {
      setSelectedFolder(null);
    }
  };

  return {
    folders,
    selectedFolder,
    isCreatingFolder,
    newFolderName,
    setFolders,
    setSelectedFolder,
    setIsCreatingFolder,
    setNewFolderName,
    handleCreateFolder,
    handleDeleteFolder
  };
}; 