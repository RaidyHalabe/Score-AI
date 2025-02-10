import React, { useState, useEffect, useRef, KeyboardEvent, useMemo } from 'react';

import { ArrowLeft, Plus, MessageSquare, X, Pencil, FolderPlus, ChevronRight, Trash2, Calendar, Clock, User, Coins, Trash, LogOut } from 'lucide-react';

import { Message, Folder, Chat } from './types';

import { Sidebar } from './components/Layout/Sidebar';

import { MessageList } from './components/Chat/MessageList';

import { MessageInput } from './components/Chat/MessageInput';

import { WelcomeScreen } from './components/Chat/WelcomeScreen';

import { LandingPage } from './components/Landing/LandingPage';

import { CoinsScreen } from './components/Coins/CoinsScreen';

import { SettingsModal } from './components/Settings/SettingsModal';

import { LanguageProvider } from './contexts/LanguageContext';

import { useLanguage } from './contexts/LanguageContext';

import { ThemeProvider } from './contexts/ThemeContext';

import './styles.css';





function App() {

  const [prompt, setPrompt] = useState('');

  const [messages, setMessages] = useState<Message[]>([]);

  const [activeChatDropdown, setActiveChatDropdown] = useState<string | null>(null);

  const [activeFolderDropdown, setActiveFolderDropdown] = useState<string | null>(null);

  const [newFolderName, setNewFolderName] = useState('');

  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  const [editingChatId, setEditingChatId] = useState<string | null>(null);

  const [editingChatTitle, setEditingChatTitle] = useState('');

  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const [showChat, setShowChat] = useState(false);

  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  const [showAddChatModal, setShowAddChatModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const [folders, setFolders] = useState<Folder[]>([]);

  const [chats, setChats] = useState<Chat[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [abortController, setAbortController] = useState<AbortController | null>(null);

  const [isCanceling, setIsCanceling] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

  const [showLanding, setShowLanding] = useState(true);

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [showCoinsScreen, setShowCoinsScreen] = useState(false);

  const [showSettings, setShowSettings] = useState(false);

  const [coins, setCoins] = useState(100);

  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const [editingFolderName, setEditingFolderName] = useState('');

  const createFolderRef = useRef<HTMLDivElement>(null);

  const chatDropdownRef = useRef<HTMLDivElement>(null);

  const folderDropdownRef = useRef<HTMLDivElement>(null);

  const editChatRef = useRef<HTMLInputElement>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);



  const { t } = useLanguage();



  const handleNewChat = (addToFolder: boolean = false) => {
    const newChat: Chat = {
      id: String(Date.now()),
      title: t('sidebar.newChat'),
      desc: t('sidebar.chatDescriptions.starting'),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setChats([newChat, ...chats]);
    setSelectedChat(newChat);
    setMessages([]);
    
    if (selectedFolder && addToFolder) {
      setFolders(folders.map(folder => 
        folder.id === selectedFolder
          ? {
              ...folder,
              chats: [...folder.chats, newChat.id],
              updatedAt: new Date()
            }
          : folder
      ));
    }

    if (!prompt) {
      setShowWelcomeScreen(true);
    }
    setShowChat(false);
  };



  const handleDeleteFolder = (folderId: string) => {

    setFolders(folders.filter(folder => folder.id !== folderId));

    if (selectedFolder === folderId) {

      setSelectedFolder(null);

      setShowChat(false);

    }

    setActiveFolderDropdown(null);

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
    setChats(chats.filter(chat => chat.id !== chatId));
    if (selectedChat?.id === chatId) {
      setSelectedChat(null);
      setShowChat(false);
      setShowWelcomeScreen(true);
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

    setActiveChatDropdown(activeChatDropdown === chatId ? null : chatId);

  };



  const handleFolderClick = (folderId: string) => {
    setSelectedFolder(folderId);
    setShowChat(false);
    setShowWelcomeScreen(false);
    setIsSidebarOpen(false);
  };



  const handleChatClick = (chat: Chat) => {
    setSelectedChat(chat);
    setShowChat(true);
    setShowWelcomeScreen(false);
    setIsSidebarOpen(false);
    if (chat.messages) {
      setMessages(chat.messages);
    } else {
      setMessages([]);
    }
  };



  const handleBackClick = () => {
    setShowChat(false);
    setShowWelcomeScreen(true);
    setSelectedFolder(null);
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



  const handleCancelMessage = () => {

    if (abortController) {

      setIsCanceling(true);

      setTimeout(() => {

        abortController.abort();

        setIsLoading(false);

        setAbortController(null);

        setIsCanceling(false);

      }, 300);

    }

  };



  const streamResponse = (text: string, callback: (chunk: string) => void) => {

    const words = text.split(' ');

    let index = 0;



    const stream = setInterval(() => {

      if (index < words.length) {

        const chunk = words.slice(index, index + 2).join(' ') + ' ';

        callback(chunk);

        index += 2;

      } else {

        clearInterval(stream);

      }

    }, 50);



    return () => clearInterval(stream);

  };



  const handleSendMessage = async () => {

    if (prompt && prompt.trim()) {

      const newMessage: Message = {
        id: String(Date.now()),
        content: prompt,
        role: 'user',
        createdAt: new Date()
      };

      

      if (!selectedChat || messages.length === 0) {

        const chatTitle = prompt.trim().length > 50 
          ? prompt.trim().slice(0, 47) + '...'
          : prompt.trim();

        const newChat: Chat = {

          id: String(Date.now()),

          title: chatTitle,

          desc: prompt.trim(),

          createdAt: new Date(),

          updatedAt: new Date()

        };

        if (selectedChat) {
          setChats(chats.map(chat => 
            chat.id === selectedChat.id ? newChat : chat
          ));
        } else {
          setChats([newChat, ...chats]);
        }
        setSelectedChat(newChat);
      }



      setMessages(prev => [...prev, newMessage]);
      setPrompt('');
      setShowChat(true);
      setShowWelcomeScreen(false);



      try {

        setIsLoading(true);

        const controller = new AbortController();

        setAbortController(controller);



        const response = await fetch('https://ai.tigoostudios.com/api/games/today', {

          method: 'POST',

          headers: { 'Content-Type': 'application/json' },

          body: JSON.stringify({ input: prompt.trim() }),

          signal: controller.signal

        });



        const data = await response.json();



        const aiResponse: Message = {

          id: (Date.now() + 1).toString(),

          content: '',

          role: 'assistant',

          createdAt: new Date()

        };
        setMessages(prev => [...prev, aiResponse]);



        // Streaming da resposta

        streamResponse(data.res2, (chunk) => {

          setMessages(prev => prev.map(msg => 

            msg.id === aiResponse.id

              ? { ...msg, content: msg.content + chunk }

              : msg

          ));

        });



      } catch (error: any) {

        if (error.name === 'AbortError') {

          console.log('Requisição cancelada pelo usuário');

        } else {

          console.error('Erro:', error);

          const errorMessage: Message = {

            id: (Date.now() + 1).toString(),

            content: "Desculpe, ocorreu um erro ao processar sua mensagem.",

            role: 'assistant',

            createdAt: new Date()

          };

          setMessages(prev => [...prev, errorMessage]);

        }

      } finally {

        setIsLoading(false);

        setAbortController(null);

      }

    }

  };



  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {

    if (e.key === 'Enter' && !e.shiftKey) {

      e.preventDefault();

      handleSendMessage();

    }

  };



  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (createFolderRef.current && !createFolderRef.current.contains(event.target as Node)) {
        setIsCreatingFolder(false);
        setNewFolderName('');
      }
      if (folderDropdownRef.current && !folderDropdownRef.current.contains(event.target as Node)) {
        setActiveFolderDropdown(null);
      }
      if (editChatRef.current && !editChatRef.current.contains(event.target as Node)) {
        setEditingChatId(null);
        setEditingChatTitle('');
      }
      if (showProfileMenu && !(event.target as Element).closest('.profile-menu')) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileMenu]);



  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  }, [messages]);



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

  const { chats: filteredChats, folders: filteredFolders } = filteredItems;



  const availableChatsForFolder = selectedFolder

    ? filteredChats.filter(chat => !folders.find(f => f.id === selectedFolder)?.chats.includes(chat.id))

    : [];



  const handleStartClick = () => {
    setShowLanding(false);
    setShowWelcomeScreen(true);
  };

  const handleDeleteAllChats = () => {
    setChats([]);
    setMessages([]);
    setSelectedChat(null);
    setShowChat(false);
    setShowWelcomeScreen(true);
  };

  const handleRenameFolder = (folderId: string) => {
    const folder = folders.find(f => f.id === folderId);
    if (folder) {
      setEditingFolderId(folderId);
      setEditingFolderName(folder.name);
    }
  };

  const handleSaveRenamedFolder = () => {
    if (editingFolderId && editingFolderName.trim()) {
      setFolders(folders.map(folder => 
        folder.id === editingFolderId 
          ? { ...folder, name: editingFolderName.trim() }
          : folder
      ));
      setEditingFolderId(null);
      setEditingFolderName('');
    }
  };

  if (showLanding) {
    return (
      <LandingPage onStartClick={handleStartClick} />
    );
  }

  if (showCoinsScreen) {
    return (
      <CoinsScreen 
        onBack={() => setShowCoinsScreen(false)} 
        currentCoins={coins}
        onBuyCoins={(amount) => setCoins(coins + amount)}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black text-gray-200 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-green-500/20 blur-[120px] rounded-full" />
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-green-500/20 blur-[120px] rounded-full" />
      </div>

      {/* Main container */}
      <div className="relative z-10 flex gap-2 sm:gap-4 max-w-[1850px] mx-auto h-screen p-4">
        {/* Sidebar */}
        <div 
          className={`
            fixed lg:relative lg:block flex-shrink-0 lg:pl-2 xl:pl-6 z-50
            transform transition-all duration-300 ease-in-out
            ${isSidebarOpen 
              ? 'translate-x-0 opacity-100' 
              : '-translate-x-full lg:translate-x-0 opacity-0 lg:opacity-100'
            }
          `}
        >
          <div className="w-80 flex flex-col h-[calc(100vh-2rem)] bg-[#1a1a1a] rounded-2xl overflow-hidden z-10 mt-2">
            <Sidebar
              folders={filteredFolders}
              chats={filteredChats}
              selectedFolder={selectedFolder}
              activeChatDropdown={activeChatDropdown}
              activeFolderDropdown={activeFolderDropdown}
              isCreatingFolder={isCreatingFolder}
              newFolderName={newFolderName}
              editingChatId={editingChatId}
              editingChatTitle={editingChatTitle}
              createFolderRef={createFolderRef}
              chatDropdownRef={chatDropdownRef}
              folderDropdownRef={folderDropdownRef}
              editChatRef={editChatRef}
              onFolderClick={handleFolderClick}
              onDeleteFolder={handleDeleteFolder}
              setActiveChatDropdown={setActiveChatDropdown}
              setActiveFolderDropdown={setActiveFolderDropdown}
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
              setShowSettings={setShowSettings}
              onRenameFolder={handleRenameFolder}
              onSaveRenamedFolder={handleSaveRenamedFolder}
            />
          </div>
        </div>

        {/* Overlay para fechar o menu em telas pequenas */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Content Area */}
        <div className="flex-1 relative flex flex-col max-w-[1450px] mx-auto w-full mt-12 lg:mt-0">
          {selectedFolder && !showChat ? (
            <div className="h-full overflow-y-auto lg:ml-0 ml-0">
              <div className="flex items-center justify-between mb-8 mt-1.5 ml-14">
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={handleBackClick}
                    className="p-1 hover:bg-[#252525] rounded-lg transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-400" />
                  </button>
                  <h2 className="text-xl font-medium text-gray-200 ">Conteúdo da Pasta</h2>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAddChatModal(true)}
                    className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-[#252525] rounded-lg hover:bg-[#353535] transition-colors"
                  >
                    <Plus className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-300">Adicionar conversas</span>
                  </button>
                  <button
                    onClick={() => handleNewChat(true)}
                    className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-white" />
                    <span className="text-sm text-white">Nova conversa</span>
                  </button>
                </div>
              </div>

              {folders.find(f => f.id === selectedFolder)?.chats.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
                  <MessageSquare className="w-16 h-16 text-gray-500 mb-4" />
                  <h3 className="text-lg font-medium text-gray-300 mb-2">Pasta vazia</h3>
                  <p className="text-gray-500 text-center max-w-md mb-6">
                    Esta pasta ainda não possui conversas. Adicione conversas existentes ou crie uma nova conversa.
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowAddChatModal(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-[#252525] rounded-lg hover:bg-[#353535] transition-colors"
                    >
                      <Plus className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-300">Adicionar conversas</span>
                    </button>
                    <button
                      onClick={() => handleNewChat(true)}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 text-white" />
                      <span className="text-sm text-white">Nova conversa</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {chats
                    .filter(chat => folders.find(f => f.id === selectedFolder)?.chats.includes(chat.id))
                    .map((chat) => (
                      <div
                        key={chat.id}
                        onClick={() => handleChatClick(chat)}
                        className="flex flex-col p-4 sm:p-6 lg:p-8 bg-[#1a1a1a] rounded-lg hover:bg-[#252525] cursor-pointer transition-all duration-200 border border-transparent hover:border-green-500/20 shadow-lg hover:shadow-green-500/20"
                      >
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
                            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-green-500" />
                            <h3 className="text-base sm:text-lg lg:text-xl font-medium text-gray-200 group-hover:text-white transition-colors">
                              {chat.title}
                            </h3>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteChat(chat.id);
                            }}
                            className="p-1.5 rounded-lg hover:bg-[#454545] text-gray-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 group-hover:text-gray-300 transition-colors mb-4">
                          {chat.desc}
                        </p>

                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#353535]">
                          <div className="flex items-center space-x-1.5">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                            <span className="text-[10px] sm:text-xs text-gray-500">
                              Última atualização {new Date(chat.updatedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1.5">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                            <span className="text-[10px] sm:text-xs text-gray-500">
                              Criado em {new Date(chat.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ) : showWelcomeScreen ? (
            <div className="h-full lg:ml-0 ml-8">
              <WelcomeScreen
                prompt={prompt}
                onPromptChange={setPrompt}
                onSendMessage={handleSendMessage}
                onKeyPress={handleKeyPress}
              />
            </div>
          ) : showChat && selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="sticky z-10 flex items-center justify-between py-3 lg:ml-0 ml-16 pt-1">
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={handleBackClick}
                    className="p-1 hover:bg-[#252525] rounded-lg transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-400" />
                  </button>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-lg font-medium text-gray-200 truncate max-w-[300px]">
                      {selectedChat?.title || 'Nova conversa'}
                    </h2>
                    <span className="px-2 py-0.5 text-[10px] font-medium bg-green-500/10 text-green-500 rounded flex-shrink-0">
                      Score AI
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 px-3 py-1.5 bg-[#252525] rounded-lg">
                    <Coins className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-300">{coins}</span>
                  </div>
                  <div className="w-4"></div>
                </div>
              </div>

              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 overflow-y-auto">
                  <MessageList 
                    messages={messages} 
                    messagesEndRef={messagesEndRef}
                    isLoading={isLoading}
                    isCanceling={isCanceling}
                  />
                </div>

                <div className="sticky bottom-0 pt-4">
                  <div className="relative">
                    <MessageInput
                      prompt={prompt}
                      onPromptChange={(value) => setPrompt(value)}
                      onSendMessage={handleSendMessage}
                      onCancel={handleCancelMessage}
                      onKeyPress={handleKeyPress}
                      placeholder="Envie uma mensagem para Score AI..."
                      darkMode
                      isLoading={isLoading}
                      iconColor="text-white"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
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

      {activeChatDropdown && (
        <div 
          ref={chatDropdownRef}
          className="fixed w-56 bg-[#252525] rounded-lg shadow-lg py-1 z-50 animate-fadeIn"
          style={{ 
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              const chat = chats.find(c => c.id === activeChatDropdown);
              if (chat) {
                setEditingChatId(chat.id);
                setEditingChatTitle(chat.title);
              }
              setActiveChatDropdown(null);
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
                .filter(folder => !folder.chats.includes(activeChatDropdown))
                .map(folder => (
                  <button
                    key={folder.id}
                    onClick={() => {
                      handleAddChatToFolder(activeChatDropdown, folder.id);
                      setActiveChatDropdown(null);
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 hover:bg-[#353535] text-left text-sm text-gray-300 hover:text-gray-200 transition-colors"
                  >
                    <span>{folder.name}</span>
                  </button>
                ))}
              {folders.filter(folder => !folder.chats.includes(activeChatDropdown)).length === 0 && (
                <div className="px-3 py-2 text-sm text-gray-500">
                  Nenhuma pasta disponível
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              handleDeleteChat(activeChatDropdown);
              setActiveChatDropdown(null);
            }}
            className="w-full flex items-center space-x-2 px-3 py-2 hover:bg-[#353535] text-left text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Excluir</span>
          </button>
        </div>
      )}

      {/* Profile button for mobile */}
      <div className="fixed top-4 right-6 z-50 profile-menu">
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (showProfileMenu) {
              setShowProfileMenu(false);
            } else {
              setShowProfileMenu(true);
            }
          }}
          className="p-2 bg-[#252525] rounded-lg hover:bg-[#353535] transition-colors border border-transparent hover:border-green-500/20"
        >
          <User className="w-5 h-5 text-gray-400 hover:text-green-500" />
        </button>

        {/* Profile Dropdown Menu */}
        {showProfileMenu && (
          <div className="absolute right-0 mt-2 w-56 bg-[#1a1a1a] rounded-lg shadow-lg py-2 border border-[#252525] animate-slideIn">
            <button
              onClick={() => {
                setShowCoinsScreen(true);
                setShowProfileMenu(false);
              }}
              className="w-full flex items-center space-x-3 px-5 py-3 text-sm text-gray-400 hover:bg-[#252525] hover:text-green-500 transition-all duration-200"
            >
              <Coins className="w-4 h-4" />
              <span>{t('common.profile.coins').replace('{0}', coins.toString())}</span>
            </button>

            <button
              onClick={() => {
                handleDeleteAllChats();
                setShowProfileMenu(false);
              }}
              className="w-full flex items-center space-x-3 px-5 py-3 text-sm text-gray-400 hover:bg-[#252525] hover:text-green-500"
            >
              <Trash className="w-4 h-4" />
              <span>{t('common.profile.deleteAllChats')}</span>
            </button>

            <button
              onClick={() => {
                setShowProfileMenu(false);
              }}
              className="w-full flex items-center space-x-3 px-5 py-3 text-sm text-red-400 hover:bg-[#252525] hover:text-red-500"
            >
              <LogOut className="w-4 h-4" />
              <span>{t('common.profile.logout')}</span>
            </button>
          </div>
        )}
      </div>

      {/* Settings Modal */}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </LanguageProvider>
  );
}
