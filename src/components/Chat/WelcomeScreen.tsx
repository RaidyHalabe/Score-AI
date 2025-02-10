import React from 'react';
import { GiCalendar, GiSoccerBall, GiTrophyCup } from 'react-icons/gi';
import { HiOutlineSparkles } from 'react-icons/hi';
import { MessageInput } from './MessageInput';
import { useLanguage } from '../../contexts/LanguageContext';

interface WelcomeScreenProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function WelcomeScreen({
  prompt,
  onPromptChange,
  onSendMessage,
  onKeyPress,
}: WelcomeScreenProps) {
  const { t } = useLanguage();

  const suggestions = [
    {
      icon: <GiCalendar className="w-5 h-5 text-green-500" />,
      title: t('welcome.nextMatch'),
      description: t('welcome.whenIsMatch')
    },
    {
      icon: <GiSoccerBall className="w-5 h-5 text-green-500" />,
      title: t('welcome.probabilities'),
      description: t('welcome.winChances')
    },
    {
      icon: <GiTrophyCup className="w-5 h-5 text-green-500" />,
      title: t('welcome.performance'),
      description: t('welcome.performanceAnalysis')
    }
  ];

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col items-center justify-center overflow-hidden relative">
      <div 
        className="w-[95%] sm:w-[85%] lg:max-w-[800px] xl:max-w-[1000px]
        min-h-[480px] bg-[#1a1a1a] rounded-xl p-3 sm:p-6 xl:p-8 text-center relative z-20 shadow-xl"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 via-transparent to-transparent rounded-xl opacity-25 mix-blend-normal" />
        <div className="absolute inset-0 bg-[#1a1a1a] rounded-xl" />
        <div className="relative z-10 flex flex-col h-full py-3">
          <div className="flex justify-center mb-3">
            <HiOutlineSparkles className="w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 text-green-500" />
          </div>
          <h1 className="text-lg md:text-xl lg:text-3xl font-medium mb-2 text-gray-200 truncate max-w-full">
            {t('welcome.title')}
          </h1>
          <p className="text-xs md:text-sm lg:text-base text-gray-400 mb-4">
            {t('welcome.subtitle')}
          </p>

          <div className="grid grid-cols-2 gap-2 mb-2">
            {suggestions.slice(0, 2).map((suggestion) => (
              <button
                key={suggestion.title}
                onClick={() => {
                  onPromptChange(suggestion.description);
                  onSendMessage();
                }}
                className="flex flex-col items-center p-2 sm:p-3 bg-[#252525] rounded-lg hover:bg-[#353535] transition-colors group h-[100px] sm:h-[130px] lg:h-[110px]"
              >
                <div className="mb-1.5">
                  {React.cloneElement(suggestion.icon, { 
                    className: "w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 text-green-500"
                  })}
                </div>
                <div className="text-xs md:text-sm lg:text-base font-medium text-gray-300 mb-1">
                  {suggestion.title}
                </div>
                <div className="text-[10px] md:text-xs lg:text-sm text-gray-500 line-clamp-2 px-2 sm:px-3">
                  {suggestion.description}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-2 mb-4">
            <button
              onClick={() => {
                onPromptChange(suggestions[2].description);
                onSendMessage();
              }}
              className="w-full flex flex-col items-center p-3 bg-[#252525] rounded-lg hover:bg-[#353535] transition-colors group h-[120px] sm:h-[130px] lg:h-[110px]"
            >
              <div className="mb-1.5">
                {React.cloneElement(suggestions[2].icon, { 
                  className: "w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 text-green-500"
                })}
              </div>
              <div className="text-xs md:text-sm lg:text-base font-medium text-gray-300 mb-1">
                {suggestions[2].title}
              </div>
              <div className="text-[10px] md:text-xs lg:text-sm text-gray-500 line-clamp-2 px-2 sm:px-3">
                {suggestions[2].description}
              </div>
            </button>
          </div>

          <div className="mt-auto">
            <MessageInput
              prompt={prompt}
              onPromptChange={onPromptChange}
              onSendMessage={onSendMessage}
              onKeyPress={onKeyPress}
              placeholder={t('welcome.typeMessage')}
              iconColor="text-black"
            />
          </div>
        </div>
      </div>
      
      <p className="text-center text-gray-500 text-xs sm:text-sm fixed bottom-2 lg:bottom-6 z-20">
        {t('welcome.disclaimer')}
      </p>
    </div>
  );
} 