import React, { useState, useRef, useEffect } from 'react';
import { MessageInput } from './MessageInput';
import { MessageList } from './MessageList';
import { Message } from '../../types';

export function ChatContainer() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (!prompt.trim()) return;

    // Adiciona mensagem do usuário
    const userMessage: Message = {
      id: String(Date.now()),
      content: prompt,
      role: 'user',
      createdAt: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await fetch('https://ai.tigoostudios.com/api/games/today', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: prompt })
      });

      const data = await response.json();

      // Adiciona resposta da API
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.res2,
        role: 'assistant',
        createdAt: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Erro:', error);
    }

    setPrompt('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <MessageList messages={messages} messagesEndRef={messagesEndRef} />
      <MessageInput
        prompt={prompt}
        onPromptChange={setPrompt}
        onSendMessage={handleSendMessage}
        onKeyPress={handleKeyPress}
        darkMode={true}
      />
    </div>
  );
} 