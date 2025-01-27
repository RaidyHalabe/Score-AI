import React from 'react';
import { GiSoccerBall, GiTrophyCup, GiCalendar } from "react-icons/gi";

interface SuggestionProps {
  title: string;
  description: string;
  query: string;
  onClick: (query: string) => void;
}

function Suggestion({ title, description, query, onClick }: SuggestionProps) {
  return (
    <button 
      onClick={() => onClick(query)}
      className="w-full flex flex-col items-center text-center bg-[#252525] p-4 rounded-lg hover:bg-[#2a2a2a] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group"
    >
      <div className="p-2 bg-[#353535] rounded-lg group-hover:bg-[#454545] transition-colors mb-3">
        {title === "Próxima Partida" ? (
          <GiCalendar className="w-5 h-5 text-green-500" />
        ) : title === "Desempenho" ? (
          <GiTrophyCup className="w-5 h-5 text-green-500" />
        ) : (
          <GiSoccerBall className="w-5 h-5 text-green-500" />
        )}
      </div>
      <h3 className="font-medium mb-2 text-gray-200 group-hover:text-white transition-colors">{title}</h3>
      <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">{description}</p>
    </button>
  );
}

interface SuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

export function Suggestions({ onSuggestionClick }: SuggestionsProps) {
  const suggestions = [
    {
      title: "Próxima Partida",
      description: "Quando é a partida do Paris Saint-Germain?",
      query: "Quando é a partida do Paris Saint-Germain?"
    },
    {
      title: "Probabilidades",
      description: "Chances de vitória PSG vs Man City",
      query: "Quais são as chances de vitória na partida entre Paris Saint-Germain vs Manchester City?"
    },
    {
      title: "Desempenho",
      description: "Análise de desempenho PSG vs Man City",
      query: "Como está o desempenho dos times na partida do Paris Saint-Germain vs Manchester City?"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {suggestions.map((suggestion) => (
        <Suggestion
          key={suggestion.title}
          title={suggestion.title}
          description={suggestion.description}
          query={suggestion.query}
          onClick={onSuggestionClick}
        />
      ))}
    </div>
  );
}