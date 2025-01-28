import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';

import { Save, Share, ArrowLeft, Plus, MessageSquare, X, Pencil, FolderPlus, ChevronRight, Trash2, Calendar, Clock, FolderOpen } from 'lucide-react';

import { Message, Folder, Chat } from './types';

import { Sidebar } from './components/Layout/Sidebar';

import { MessageList } from './components/Chat/MessageList';

import { MessageInput } from './components/Chat/MessageInput';

import { WelcomeScreen } from './components/Chat/WelcomeScreen';

import './styles.css';



function App() {

  const [prompt, setPrompt] = useState('');

  const [messages, setMessages] = useState<Message[]>([]);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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

      const userMessage: Message = {

        id: Date.now().toString(),

        content: prompt.trim(),

        timestamp: new Date(),

        isUser: true

      };

      

      if (!selectedChat) {

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

        setChats([newChat, ...chats]);

        setSelectedChat(newChat);

      } else {

        if (messages.length === 0) {

          setChats(chats.map(chat => 

            chat.id === selectedChat.id

              ? { 

                  ...chat, 

                  title: prompt.trim().length > 50 

                    ? prompt.trim().slice(0, 47) + '...'

                    : prompt.trim(),

                  desc: prompt.trim(), 

                  updatedAt: new Date() 

                }

              : chat

          ));

        }

      }



      setMessages(prev => [...prev, userMessage]);

      setPrompt('');

      setShowChat(true);



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

          timestamp: new Date(),

          isUser: false

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

            timestamp: new Date(),

            isUser: false

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

      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {

        setActiveDropdown(null);

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



  const availableChatsForFolder = selectedFolder

    ? filteredChats.filter(chat => !folders.find(f => f.id === selectedFolder)?.chats.includes(chat.id))

    : [];



  return (
    <div className="min-h-screen bg-black text-gray-200 relative p-4">
      {/* Menu button for mobile */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#252525] rounded-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24">
          <path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
      </button>

      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-green-500/20 blur-[120px] rounded-full" />
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-green-500/20 blur-[120px] rounded-full" />
      </div>

      {/* Main container */}
      <div className="relative z-10 flex gap-4 max-w-[1850px] mx-auto h-[calc(100vh-2rem)]">
        {/* Sidebar */}
        <div className={`${isSidebarOpen ? 'block' : 'hidden lg:block'} flex-shrink-0 lg:pl-6`}>
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
        </div>

        {/* Content Area */}
        <div className="flex-1 relative flex flex-col max-w-[1450px] mx-auto w-full">
          {selectedFolder && !showChat ? (
            <div className="h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => {
                      setSelectedFolder(null);
                      setShowChat(false);
                    }}
                    className="p-1 hover:bg-[#252525] rounded-lg transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-400" />
                  </button>
                  <h2 className="text-xl font-medium text-gray-200">Conteúdo da Pasta</h2>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAddChatModal(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-[#252525] rounded-lg hover:bg-[#353535] transition-colors"
                  >
                    <Plus className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-300">Adicionar conversas</span>
                  </button>
                  <button
                    onClick={handleNewChat}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-white" />
                    <span className="text-sm text-white">Nova conversa</span>
                  </button>
                </div>
              </div>

              {folders.find(f => f.id === selectedFolder)?.chats.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
                  <FolderOpen className="w-16 h-16 text-gray-500 mb-4" />
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
                      onClick={handleNewChat}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 text-white" />
                      <span className="text-sm text-white">Nova conversa</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {chats
                    .filter(chat => folders.find(f => f.id === selectedFolder)?.chats.includes(chat.id))
                    .map(chat => (
                      <div
                        key={chat.id}
                        className="group flex flex-col p-4 bg-[#252525] rounded-lg cursor-pointer hover:bg-[#353535] transition-all duration-200"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3" onClick={() => {
                            setSelectedChat(chat);
                            setShowChat(true);
                          }}>
                            <div className="p-2 bg-[#353535] rounded-lg group-hover:bg-[#454545] transition-colors">
                              <MessageSquare className="w-5 h-5 text-green-500" />
                            </div>
                            <h3 className="text-base font-medium text-gray-200 group-hover:text-white transition-colors">
                              {chat.title}
                            </h3>
                          </div>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteChat(chat.id);
                            }}
                            className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-[#454545] transition-all"
                          >
                            <Trash2 className="w-4 h-4 text-red-400 hover:text-red-300" />
                          </button>
                        </div>

                        <p className="text-sm text-gray-400 line-clamp-2 group-hover:text-gray-300 transition-colors">
                          {chat.desc}
                        </p>
                        <div className="flex items-center space-x-4 mt-4">
                          <div className="flex items-center space-x-1.5">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-xs text-gray-500">
                              Atualizado {new Date(chat.updatedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ) : showChat && selectedChat ? (
            <>
              <div className="sticky top-0 z-10 flex items-center justify-between py-4">
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
          ) : (
            <div className="flex-1 flex flex-col">
              <WelcomeScreen
                prompt={prompt}
                onPromptChange={(value) => setPrompt(value)}
                onSendMessage={handleSendMessage}
                onKeyPress={handleKeyPress}
              />
            </div>
          )}
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
