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
    description: "Chances de vitória Paris Saint-Germain vs Manchester City"
  },
  {
    icon: <GiTrophyCup className="w-5 h-5 text-green-500" />,
    title: "Desempenho",
    description: "Análise de desempenho Paris Saint-Germain vs Manchester City"
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
      <div className="max-w-[800px] xl:max-w-[1000px] w-full h-[430px] xl:h-[550px] bg-[#1a1a1a] rounded-xl p-6 xl:p-8 text-center relative z-20 shadow-xl -translate-y-12">
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 via-transparent to-transparent rounded-xl opacity-25 mix-blend-normal" />
        <div className="absolute inset-0 bg-[#1a1a1a] rounded-xl" />
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-center mb-3 xl:mb-4">
            <HiOutlineSparkles className="w-12 h-12 xl:w-16 xl:h-16 text-green-500" />
          </div>
          <h1 className="text-2xl xl:text-3xl font-medium mb-2 xl:mb-3 text-gray-200">
            Como posso ajudar você hoje?
          </h1>
          <p className="text-base xl:text-lg text-gray-400 mb-8 xl:mb-10">
            Score AI está aqui para ajudar você com qualquer tarefa ou pergunta.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xl:gap-4 mb-3 xl:mb-4">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => {
                  onPromptChange(suggestion.description);
                  onSendMessage();
                }}
                className="flex flex-col items-center p-4 xl:p-5 bg-[#252525] rounded-lg hover:bg-[#353535] transition-colors group"
              >
                <div className="mb-2 xl:mb-3">
                  {React.cloneElement(suggestion.icon, { 
                    className: "w-5 h-5 xl:w-7 xl:h-7 text-green-500" 
                  })}
                </div>
                <div className="text-sm xl:text-base font-medium text-gray-300 mb-1 xl:mb-2">
                  {suggestion.title}
                </div>
                <div className="text-xs xl:text-sm text-gray-500 line-clamp-2">
                  {suggestion.description}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 xl:mt-8">
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