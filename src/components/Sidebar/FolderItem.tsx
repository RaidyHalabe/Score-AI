import React from 'react';
import { FolderClosed, MoreVertical, FolderOpen, Trash2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface FolderItemProps {
  folder: {
    id: string;
    name: string;
    chats: string[];
  };
  selectedFolder: string | null;
  activeDropdown: string | null;
  onFolderClick: (id: string) => void;
  onDeleteFolder: (id: string) => void;
  setActiveDropdown: (id: string | null) => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

export function FolderItem({
  folder,
  selectedFolder,
  activeDropdown,
  onFolderClick,
  onDeleteFolder,
  setActiveDropdown,
  dropdownRef,
}: FolderItemProps) {
  const { t } = useLanguage();
  const isEmpty = folder.chats.length === 0;

  const handleFolderMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === folder.id ? null : folder.id);
  };

  return (
    <div 
      onClick={() => onFolderClick(folder.id)}
      className={`group flex flex-col p-2 rounded-lg cursor-pointer transition-all duration-200 ${
        selectedFolder === folder.id 
          ? 'bg-green-500/10 border border-green-500/20' 
          : 'hover:bg-[#252525]/50 border border-transparent'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5 flex-1 min-w-0">
          <div className={`flex items-center justify-center w-7 h-7 rounded-lg transition-colors ${
            selectedFolder === folder.id
              ? 'bg-green-500/20'
              : 'bg-[#252525] group-hover:bg-[#353535]'
          }`}>
            {isEmpty ? (
              <FolderOpen className={`w-4 h-4 ${
                selectedFolder === folder.id
                  ? 'text-green-500'
                  : 'text-gray-400 group-hover:text-green-500'
              } transition-colors`} />
            ) : (
              <FolderClosed className={`w-4 h-4 ${
                selectedFolder === folder.id
                  ? 'text-green-500'
                  : 'text-gray-400 group-hover:text-green-500'
              } transition-colors`} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium truncate transition-colors ${
                selectedFolder === folder.id
                  ? 'text-green-500'
                  : 'text-gray-300 group-hover:text-gray-200'
              }`}>
                {folder.name}
              </span>
              <span className={`flex-shrink-0 px-2 py-0.5 text-[10px] font-medium rounded-full transition-colors ${
                selectedFolder === folder.id
                  ? 'bg-green-500/20 text-green-500'
                  : 'bg-[#252525] text-gray-400 group-hover:bg-[#353535]'
              }`}>
                {folder.chats.length}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleFolderMoreClick}
          className="p-1.5 rounded-lg hover:bg-[#353535] text-gray-400 hover:text-green-500 
            transition-all duration-200 opacity-60 hover:opacity-100 relative z-10"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      {activeDropdown === folder.id && (
        <div 
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-48 bg-[#252525] rounded-lg shadow-lg py-1 z-50 animate-fadeIn border border-[#353535]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteFolder(folder.id);
            }}
            className="w-full flex items-center space-x-2 px-3 py-2 hover:bg-[#353535] text-left text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>{t('sidebar.folderActions.delete')}</span>
          </button>
        </div>
      )}
    </div>
  );
}