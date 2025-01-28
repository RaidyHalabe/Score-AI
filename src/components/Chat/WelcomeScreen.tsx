import React from 'react';
import { GiCalendar, GiSoccerBall, GiTrophyCup } from 'react-icons/gi';
import { HiOutlineSparkles } from 'react-icons/hi';
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
    <div className="h-[calc(100vh-2rem)] flex flex-col items-center justify-center overflow-hidden relative">
      <div className="max-w-4xl w-full h-[550px] bg-[#1a1a1a] rounded-xl p-8 text-center relative z-20 shadow-xl -translate-y-12">
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 via-transparent to-transparent rounded-xl opacity-25 mix-blend-normal" />
        <div className="absolute inset-0 bg-[#1a1a1a] rounded-xl" />
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-center mb-3">
            <HiOutlineSparkles className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-medium mb-2 text-gray-200">
            Como posso ajudar você hoje?
          </h1>
          <p className="text-base text-gray-400 mb-8">
            Score AI está aqui para ajudar você com qualquer tarefa ou pergunta.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => {
                  onPromptChange(suggestion.description);
                  onSendMessage();
                }}
                className="flex flex-col items-center p-6 bg-[#252525] rounded-lg hover:bg-[#353535] transition-colors group"
              >
                <div className="mb-3">
                  {React.cloneElement(suggestion.icon, { className: "w-7 h-7 text-green-500" })}
                </div>
                <div className="text-base font-medium text-gray-300 mb-2">
                  {suggestion.title}
                </div>
                <div className="text-sm text-gray-500 line-clamp-2">
                  {suggestion.description}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-auto">
            <MessageInput
              prompt={prompt}
              onPromptChange={onPromptChange}
              onSendMessage={onSendMessage}
              onKeyPress={onKeyPress}
              placeholder="Digite sua mensagem aqui..."
              iconColor="text-black"
            />
          </div>
        </div>
      </div>
      
      <p className="text-center text-gray-500 text-sm fixed bottom-8 z-20">
        Score AI pode cometer erros. Considere verificar informações importantes.
      </p>
    </div>
  );
} 