import React from 'react';
import { GiCalendar, GiSoccerBall, GiTrophyCup } from 'react-icons/gi';
import { IoSparkles } from 'react-icons/io5';
import { MessageInput } from './MessageInput';

interface WelcomeScreenProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const suggestions = [
  {
    icon: <GiCalendar className="w-5 h-5 text-green-500" />,
    title: "Próxima Partida",
    description: "Quando é a partida do Paris Saint-Germain?"
  },
  {
    icon: <GiSoccerBall className="w-5 h-5 text-green-500" />,
    title: "Probabilidades",
    description: "Chances de vitória PSG vs Man City"
  },
  {
    icon: <GiTrophyCup className="w-5 h-5 text-green-500" />,
    title: "Desempenho",
    description: "Análise de desempenho PSG vs Man City"
  }
];

export function WelcomeScreen({
  prompt,
  onPromptChange,
  onSendMessage,
  onKeyPress,
}: WelcomeScreenProps) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-[#1a1a1a] rounded-xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <IoSparkles className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-medium mb-2 text-gray-200">
          Como posso ajudar você hoje?
        </h1>
        <p className="text-gray-400 mb-8">
          Score AI está aqui para ajudar você com qualquer tarefa ou pergunta.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => {
                onPromptChange(suggestion.description);
                onSendMessage();
              }}
              className="flex flex-col items-center p-4 bg-[#252525] rounded-lg hover:bg-[#353535] transition-colors group"
            >
              <div className="mb-2">
                {suggestion.icon}
              </div>
              <div className="text-sm font-medium text-gray-300 mb-1">
                {suggestion.title}
              </div>
              <div className="text-xs text-gray-500 line-clamp-2">
                {suggestion.description}
              </div>
            </button>
          ))}
        </div>

       {/*<MessageInput
          prompt={prompt}
          onPromptChange={onPromptChange}
          onSendMessage={onSendMessage}
          onKeyPress={onKeyPress}
          placeholder="Digite sua mensagem aqui..."
        /> */}

<MessageInput
  prompt={prompt}
  onPromptChange={onPromptChange}
  onSendMessage={onSendMessage}
  onKeyPress={onKeyPress}
  placeholder="Digite sua mensagem aqui..."
  iconColor="text-green-500" // Cor para o chat de boas-vindas
  />
      </div>
    </div>
  );
} 