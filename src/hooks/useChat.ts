// Hook personalizado para lógica de chat
import { useState } from 'react';
import { Message } from '../types';
import { api } from '../services/api';
import { streamResponse } from '../utils/streamResponse';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  const handleSendMessage = async (prompt: string) => {
    if (!prompt.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: prompt,
      role: 'user',
      createdAt: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      setIsLoading(true);
      const controller = new AbortController();
      setAbortController(controller);

      const data = await api.sendMessage(prompt, controller);

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: '',
        role: 'assistant',
        createdAt: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);

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
  };

  return {
    messages,
    isLoading,
    abortController,
    handleSendMessage,
    setMessages
  };
}; 