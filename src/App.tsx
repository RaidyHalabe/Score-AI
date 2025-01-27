import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { Save, Share,  ArrowLeft, Plus, MessageSquare, Calendar, Clock, X, Pencil, Trash2, FolderPlus, ChevronRight } from 'lucide-react';
import { BsRobot } from "react-icons/bs";
import { Message, Folder, Chat } from './types';
import { Sidebar } from './components/Layout/Sidebar';
import { MessageList } from './components/Chat/MessageList';
import { MessageInput } from './components/Chat/MessageInput';
import { Suggestions } from './components/Chat/Suggestions';

function App() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [newFolderName, setNewFolderName] = useState('');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editingChatTitle, setEditingChatTitle] = useState('');
  const [activeFolderMenu, setActiveFolderMenu] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [showAddChatModal, setShowAddChatModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [folders, setFolders] = useState<Folder[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);

  const createFolderRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const editChatRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleNewChat = () => {
    const newChat: Chat = {
      id: String(Date.now()),
      title: 'Nova conversa',
      desc: 'Iniciando uma nova conversa...',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setChats([newChat, ...chats]);
    setSelectedChat(newChat);
    setShowChat(true);
    setMessages([]);
  };

  const handleDeleteFolder = (folderId: string) => {
    setFolders(folders.filter(folder => folder.id !== folderId));
    if (selectedFolder === folderId) {
      setSelectedFolder(null);
      setShowChat(false);
    }
    setActiveDropdown(null);
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const newFolder: Folder = {
        id: String(Date.now()),
        name: newFolderName.trim(),
        chats: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setFolders([newFolder, ...folders]);
      setNewFolderName('');
      setIsCreatingFolder(false);
    }
  };

  const handleDeleteChat = (chatId: string) => {
    setFolders(folders.map(folder => ({
      ...folder,
      chats: folder.chats.filter(id => id !== chatId)
    })));

    setChats(chats.filter(chat => chat.id !== chatId));

    if (selectedChat?.id === chatId) {
      setSelectedChat(null);
      setShowChat(false);
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

  const handleAddChatToFolder = (chatId: string, folderId: string) => {
    setFolders(folders.map(folder => 
      folder.id === folderId
        ? { 
            ...folder, 
            chats: [...new Set([...folder.chats, chatId])],
            updatedAt: new Date()
          }
        : folder
    ));
  };

  const handleMoreClick = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    setDropdownPosition({
      top: rect.top,
      left: rect.right + 10
    });
    setActiveDropdown(activeDropdown === chatId ? null : chatId);
    setActiveFolderMenu(null);
  };

  const handleFolderClick = (folderId: string) => {
    setSelectedFolder(folderId);
    setShowChat(false);
    setSelectedChat(null);
  };

  const handleChatClick = (chat: Chat) => {
    setSelectedChat(chat);
    setShowChat(true);
  };

  const handleBackClick = () => {
    setSelectedChat(null);
    setShowChat(false);
  };

  const handleBackToMenu = () => {
    setSelectedFolder(null);
    setShowChat(false);
    setSelectedChat(null);
  };

  const handleAddChatsToFolder = (chatIds: string[]) => {
    if (selectedFolder) {
      setFolders(folders.map(folder => 
        folder.id === selectedFolder
          ? { 
              ...folder, 
              chats: [...new Set([...folder.chats, ...chatIds])],
              updatedAt: new Date()
            }
          : folder
      ));
      setShowAddChatModal(false);
    }
  };

  const handleSendMessage = () => {
    if (prompt && prompt.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: prompt.trim(),
        timestamp: new Date(),
        isUser: true
      };
      
      if (!selectedChat) {
        const newChat: Chat = {
          id: String(Date.now()),
          title: prompt.trim().slice(0, 50) + (prompt.trim().length > 50 ? '...' : ''),
          desc: prompt.trim(),
          createdAt: new Date(),
          updatedAt: new Date()
        };
        setChats([newChat, ...chats]);
        setSelectedChat(newChat);
      } else {
        setChats(chats.map(chat => 
          chat.id === selectedChat.id
            ? { ...chat, desc: prompt.trim(), updatedAt: new Date() }
            : chat
        ));
      }

      setMessages(prev => [...prev, newMessage]);
      setPrompt('');
      setShowChat(true);

      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: "Estou aqui para ajudar! Como posso ser útil hoje?",
          timestamp: new Date(),
          isUser: false
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
    handleSendMessage();
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (createFolderRef.current && !createFolderRef.current.contains(event.target as Node)) {
        setIsCreatingFolder(false);
        setNewFolderName('');
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setActiveFolderMenu(null);
      }
      if (editChatRef.current && !editChatRef.current.contains(event.target as Node)) {
        setEditingChatId(null);
        setEditingChatTitle('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const filteredChats = chats.filter(chat => 
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedFolderChats = selectedFolder 
    ? filteredChats.filter(chat => folders.find(f => f.id === selectedFolder)?.chats.includes(chat.id))
    : [];

  const availableChatsForFolder = selectedFolder
    ? filteredChats.filter(chat => !folders.find(f => f.id === selectedFolder)?.chats.includes(chat.id))
    : [];

  return (
    <div className="min-h-screen bg-black text-gray-200 flex p-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-green-500/20 blur-[120px] rounded-full" />
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-green-500/20 blur-[120px] rounded-full" />
      </div>

      <Sidebar
        folders={folders}
        chats={filteredChats}
        selectedFolder={selectedFolder}
        activeDropdown={activeDropdown}
        isCreatingFolder={isCreatingFolder}
        newFolderName={newFolderName}
        editingChatId={editingChatId}
        editingChatTitle={editingChatTitle}
        createFolderRef={createFolderRef}
        dropdownRef={dropdownRef}
        editChatRef={editChatRef}
        onFolderClick={handleFolderClick}
        onDeleteFolder={handleDeleteFolder}
        setActiveDropdown={setActiveDropdown}
        setIsCreatingFolder={setIsCreatingFolder}
        setNewFolderName={setNewFolderName}
        handleCreateFolder={handleCreateFolder}
        handleMoreClick={handleMoreClick}
        onRenameChat={handleRenameChat}
        setEditingChatTitle={setEditingChatTitle}
        handleNewChat={handleNewChat}
        onChatClick={handleChatClick}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="flex-1 p-4 flex flex-col ml-4 relative z-10">
        {selectedFolder && !showChat && (
          <>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleBackToMenu}
                  className="p-1 hover:bg-[#252525] rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-400" />
                </button>
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold text-gray-200">
                    {folders.find(f => f.id === selectedFolder)?.name}
                  </h2>
                  <p className="text-sm text-gray-400">
                    {selectedFolderChats.length} {selectedFolderChats.length === 1 ? 'conversa' : 'conversas'}
                  </p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowAddChatModal(true)}
                  className="flex items-center space-x-2 min-w-[180px] px-4 py-2.5 bg-[#252525] hover:bg-[#353535] text-gray-200 rounded-lg transition-colors border border-[#353535] hover:border-green-500/20"
                >
                  <Plus className="w-5 h-5 flex-shrink-0" />
                  <span className="whitespace-nowrap">Adicionar existente</span>
                </button>
                <button 
                  onClick={handleNewChat}
                  className="flex items-center space-x-2 min-w-[160px] px-4 py-2.5 bg-[#252525] hover:bg-[#353535] text-gray-200 rounded-lg transition-colors border border-[#353535] hover:border-green-500/20"
                >
                  <Plus className="w-5 h-5 flex-shrink-0" />
                  <span className="whitespace-nowrap">Nova conversa</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedFolderChats.map(chat => (
                <div
                  key={chat.id}
                  onClick={() => handleChatClick(chat)}
                  className="group relative bg-[#1a1a1a] rounded-xl cursor-pointer transition-all duration-200 hover:translate-y-[-2px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
                  <div className="relative p-6 border border-[#252525] group-hover:border-green-500/20 rounded-xl">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className="p-2 bg-[#252525] rounded-lg group-hover:bg-[#353535] transition-colors flex-shrink-0">
                          <MessageSquare className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-lg font-medium text-gray-200 group-hover:text-white transition-colors truncate pr-4">
                            {chat.title}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                            <span className="text-xs text-gray-500 truncate">
                              Última atualização {new Date(chat.updatedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm line-clamp-2 group-hover:text-gray-300 transition-colors">
                      {chat.desc}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#252525]">
                      <div className="flex items-center space-x-2 min-w-0">
                        <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <span className="text-xs text-gray-500 truncate">
                          Criado em {new Date(chat.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <div className="px-2.5 py-1 text-xs bg-green-500/10 text-green-500 rounded-full whitespace-nowrap">
                          Score AI
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteChat(chat.id);
                          }}
                          className="p-1.5 bg-[#252525] hover:bg-[#353535] rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                        >
                          <Trash2 className="w-4 h-4 text-red-400 hover:text-red-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {selectedFolderChats.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
                  <div className="p-4 bg-[#252525] rounded-full mb-4">
                    <MessageSquare className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-300 mb-2">Nenhuma conversa encontrada</h3>
                  <p className="text-gray-500 text-center mb-6">
                    Esta pasta está vazia. Comece adicionando uma nova conversa ou movendo conversas existentes para cá.
                  </p>
                  <button 
                    onClick={handleNewChat}
                    className="flex items-center space-x-2 px-4 py-2 bg-[#252525] hover:bg-[#353535] text-gray-200 rounded-lg transition-colors border border-[#353535] hover:border-green-500/20"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Nova conversa</span>
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {showChat && selectedChat ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={handleBackClick}
                  className="p-1 hover:bg-[#252525] rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-400" />
                </button>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-200">{selectedChat.title}</span>
                  <span className="px-2.5 py-0.5 text-xs bg-green-500/20 text-green-500 rounded whitespace-nowrap">Score AI</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-[#252525] rounded-lg transition-colors">
                  <Save className="w-5 h-5 text-gray-400" />
                </button>
                <button className="p-2 hover:bg-[#252525] rounded-lg transition-colors">
                  <Share className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
            <div className="flex-1 flex flex-col">
              <MessageList messages={messages} messagesEndRef={messagesEndRef} />
              <MessageInput
                prompt={prompt}
                onPromptChange={(value) => setPrompt(value)}
                onSendMessage={handleSendMessage}
                onKeyPress={handleKeyPress}
                placeholder="Envie uma mensagem para Score AI..."
                darkMode
              />
            </div>
          </>
        ) : !selectedFolder ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="max-w-2xl w-full bg-[#1a1a1a] rounded-xl p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-[#252525] rounded-full">
                  <BsRobot   className="w-16 h-16 text-green-500" />
                </div>
              </div>
              <h1 className="text-3xl font-light mb-4 text-gray-200">
                Como posso ajudar você hoje?
              </h1>
              <p className="text-gray-400 mb-8">
                Score AI está aqui para ajudar você com qualquer tarefa ou pergunta.
              </p>

              <Suggestions onSuggestionClick={handleSuggestionClick} />

              <MessageInput
                prompt={prompt}
                onPromptChange={(value) => setPrompt(value)}
                onSendMessage={handleSendMessage}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem aqui..."
              />
            </div>
          </div>
        ) : null}

        <p className="text-center text-gray-500 text-sm mt-4">
          Score AI pode cometer erros. Considere verificar informações importantes.
        </p>
      </div>

      {showAddChatModal && selectedFolder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] rounded-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-[#252525]">
              <h2 className="text-xl font-semibold text-gray-200">Adicionar conversas existentes</h2>
              <button 
                onClick={() => setShowAddChatModal(false)}
                className="p-1 hover:bg-[#252525] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="space-y-3">
                {availableChatsForFolder.map(chat => (
                  <div
                    key={chat.id}
                    onClick={() => handleAddChatsToFolder([chat.id])}
                    className="group flex items-center space-x-4 p-4 bg-[#252525] rounded-lg cursor-pointer hover:bg-[#353535] transition-all duration-200"
                  >
                    <div className="p-2 bg-[#353535] rounded-lg group-hover:bg-[#454545] transition-colors">
                      <MessageSquare className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-medium text-gray-200 group-hover:text-white transition-colors">
                        {chat.title}
                      </h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-1.5">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-xs text-gray-500">
                            Última atualização {new Date(chat.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-xs text-gray-500">
                            Criado em {new Date(chat.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 mt-2 line-clamp-2 group-hover:text-gray-300 transition-colors">
                        {chat.desc}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <Plus className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors" />
                    </div>
                  </div>
                ))}

                {availableChatsForFolder.length === 0 && (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-300 mb-2">Nenhuma conversa disponível</h3>
                    <p className="text-gray-500">
                      Todas as conversas já estão nesta pasta ou não existem conversas para adicionar.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-[#252525] flex justify-end">
              <button
                onClick={() => setShowAddChatModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {activeDropdown && (
        <div 
          ref={dropdownRef}
          className="fixed w-56 bg-[#252525] rounded-lg shadow-lg py-1 z-50 animate-fadeIn"
          style={{ 
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              const chat = chats.find(c => c.id === activeDropdown);
              if (chat) {
                setEditingChatId(chat.id);
                setEditingChatTitle(chat.title);
              }
              setActiveDropdown(null);
            }}
            className="w-full flex items-center space-x-2 px-3 py-2 hover:bg-[#353535] text-left text-sm text-gray-300 hover:text-gray-200 transition-colors"
          >
            <Pencil className="w-4 h-4" />
            <span>Renomear</span>
          </button>

          <div className="relative group">
            <button
              className="w-full flex items-center justify-between px-3 py-2 hover:bg-[#353535] text-left text-sm text-gray-300 hover:text-gray-200 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <FolderPlus className="w-4 h-4" />
                <span>Adicionar à pasta</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="absolute left-full top-0 w-48 bg-[#252525] rounded-lg shadow-lg py-1 hidden group-hover:block ml-1">
              {folders
                .filter(folder => !folder.chats.includes(activeDropdown))
                .map(folder => (
                  <button
                    key={folder.id}
                    onClick={() => {
                      handleAddChatToFolder(activeDropdown, folder.id);
                      setActiveDropdown(null);
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 hover:bg-[#353535] text-left text-sm text-gray-300 hover:text-gray-200 transition-colors"
                  >
                    <span>{folder.name}</span>
                  </button>
                ))}
              {folders.filter(folder => !folder.chats.includes(activeDropdown)).length === 0 && (
                <div className="px-3 py-2 text-sm text-gray-500">
                  Nenhuma pasta disponível
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              handleDeleteChat(activeDropdown);
              setActiveDropdown(null);
            }}
            className="w-full flex items-center space-x-2 px-3 py-2 hover:bg-[#353535] text-left text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Excluir</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default App;