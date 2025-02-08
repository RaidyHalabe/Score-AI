import { X, Send } from 'lucide-react';
import { useState } from 'react';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  showSecondaryOptions?: boolean;
  isReportOptions?: boolean;
}

interface SupportChatProps {
  onClose: () => void;
}

export const SupportChat = ({ onClose }: SupportChatProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Olá! Como posso ajudar você hoje?',
      isBot: true
    }
  ]);

  const suggestionButtons = [
    "Problemas com o Score AI Chat",
    "Reportar bug ou problema",
    "Reportar conteúdo inadequado",
    "Redefinir senha",
    "Pagamento e cobrança",
    "Outros assuntos"
  ];

  const reportContentButtons = [
    "Ilegal",
    "Pornografia / Violência",
    "Supostamente infringido",
    "Desinformação",
    "Outros"
  ];

  const playSendSound = () => {
    const audio = new Audio('/sounds/send-message.mp3');
    audio.volume = 0.5;
    audio.play();
  };

  const playReceiveSound = () => {
    const audio = new Audio('/sounds/receive-message.mp3');
    audio.volume = 0.5;
    audio.play();
  };

  const handleSuggestionClick = (suggestion: string) => {
    playSendSound();
    // Adiciona a mensagem do usuário
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      content: suggestion,
      isBot: false
    }]);

    // Simula resposta do bot
    setTimeout(() => {
      let botResponse = "";
      
      switch (suggestion) {
        case "Problemas com o Score AI Chat":
          botResponse = "Parece que você quer saber sobre possíveis problemas ao usar o Score AI Chat. Pode especificar melhor o que você quer saber? Você está enfrentando algum problema específico com ele?";
          break;
        case "Reportar bug ou problema":
          botResponse = "Se o serviço estiver indisponível no momento, você pode verificar a página de Status do Serviço. O status será atualizado assim que o problema for resolvido.\n\nSe precisar relatar outros problemas, por favor, nos avise.";
          break;
        case "Reportar conteúdo inadequado":
          botResponse = "Por favor, escolha a categoria do problema que deseja relatar.";
          break;
        default:
          botResponse = "Due to large-scale malicious attacks on Score AI's services, we are temporarily limiting registrations to ensure continued service. Existing users can log in as usual. Thanks for your understanding and support.";
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        isBot: true
      }]);
      playReceiveSound();
    }, 1500);
  };

  const handleReportOptionClick = (option: string) => {
    playSendSound();
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      content: option,
      isBot: false
    }]);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        content: "Por favor, informe os detalhes do problema para que possamos reproduzi-lo.",
        isBot: true
      }]);
      playReceiveSound();
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 w-[420px] h-[700px] bg-[#1a1a1a] rounded-lg shadow-lg border border-[#252525] flex flex-col animate-slideIn z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#252525]">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <h3 className="text-base font-medium text-white">Suporte Score AI</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-[#353535] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 hover:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Note */}
      <div className="px-6 py-3">
        <p className="text-xs text-gray-400 text-center">
          [NOTA]: Esta página é apenas para suporte ao cliente.
          Para conversar com o modelo, visite a página inicial.
        </p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 px-6 overflow-hidden flex flex-col">
        <div className="overflow-y-auto flex-1">
          {messages.map((msg) => (
            <div key={msg.id} className="flex items-start space-x-2 py-4">
              {msg.isBot ? (
                <>
                  <div className="flex-shrink-0 w-20 h-8 bg-green-500/10 rounded-lg flex items-center justify-center px-2">
                    <span className="text-green-500 text-sm font-medium whitespace-nowrap">Score Bot</span>
                  </div>
                  {msg.isReportOptions ? (
                    <div className="flex flex-col gap-2">
                      <button className="self-end px-4 py-2 bg-[#252525] rounded-full text-sm text-gray-300 hover:bg-[#353535] transition-colors">
                        {reportContentButtons[0]}
                      </button>
                      <button className="self-end px-4 py-2 bg-[#252525] rounded-full text-sm text-gray-300 hover:bg-[#353535] transition-colors">
                        {reportContentButtons[1]}
                      </button>
                      <button className="self-end px-4 py-2 bg-[#252525] rounded-full text-sm text-gray-300 hover:bg-[#353535] transition-colors">
                        {reportContentButtons[2]}
                      </button>
                      <div className="flex gap-2 justify-end">
                        <button className="px-4 py-2 bg-[#252525] rounded-full text-sm text-gray-300 hover:bg-[#353535] transition-colors">
                          {reportContentButtons[3]}
                        </button>
                        <button className="px-4 py-2 bg-[#252525] rounded-full text-sm text-gray-300 hover:bg-[#353535] transition-colors">
                          {reportContentButtons[4]}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#252525] rounded-2xl px-4 py-2.5 max-w-[80%]">
                      <p className="text-sm text-gray-300">{msg.content}</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-[#252525] rounded-2xl px-4 py-2.5 max-w-[80%] ml-auto">
                  <p className="text-sm text-gray-300">{msg.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {messages.length === 1 ? (
          <div className="py-4">
            <div className="flex flex-col gap-2">
              {suggestionButtons.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="self-end text-right px-5 py-2.5 rounded-full bg-[#252525] hover:bg-[#353535] text-sm text-gray-300 hover:text-gray-200 transition-colors animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : messages[messages.length - 1]?.isBot && messages[messages.length - 1]?.content.includes("categoria do problema") ? (
          <div className="py-4">
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 justify-end">
                <button 
                  className="px-5 py-2.5 rounded-full bg-[#252525] hover:bg-[#353535] text-sm text-gray-300 hover:text-gray-200 transition-colors animate-fadeIn"
                  style={{ animationDelay: '0ms' }}
                  onClick={() => handleReportOptionClick("Ilegal")}
                >
                  Ilegal
                </button>
                <button 
                  className="px-5 py-2.5 rounded-full bg-[#252525] hover:bg-[#353535] text-sm text-gray-300 hover:text-gray-200 transition-colors animate-fadeIn"
                  style={{ animationDelay: '100ms' }}
                  onClick={() => handleReportOptionClick("Supostamente infringido")}
                >
                  Supostamente infringido
                </button>
              </div>
              <div className="flex gap-2 justify-end">
                <button 
                  className="px-5 py-2.5 rounded-full bg-[#252525] hover:bg-[#353535] text-sm text-gray-300 hover:text-gray-200 transition-colors animate-fadeIn"
                  style={{ animationDelay: '200ms' }}
                  onClick={() => handleReportOptionClick("Pornografia / Violência")}
                >
                  Pornografia / Violência
                </button>
                <button 
                  className="px-5 py-2.5 rounded-full bg-[#252525] hover:bg-[#353535] text-sm text-gray-300 hover:text-gray-200 transition-colors animate-fadeIn"
                  style={{ animationDelay: '300ms' }}
                  onClick={() => handleReportOptionClick("Desinformação")}
                >
                  Desinformação
                </button>
              </div>
              <div className="flex justify-end">
                <button 
                  className="px-5 py-2.5 rounded-full bg-[#252525] hover:bg-[#353535] text-sm text-gray-300 hover:text-gray-200 transition-colors animate-fadeIn"
                  style={{ animationDelay: '400ms' }}
                  onClick={() => handleReportOptionClick("Outros")}
                >
                  Outros
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Input Area */}
      <div className="px-6 py-4 border-t border-[#252525]">
        <div className="relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="w-full bg-[#252525] text-gray-200 rounded-lg pl-5 pr-12 py-3 focus:outline-none focus:ring-1 focus:ring-green-500 text-sm"
          />
          <button 
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
          >
            <Send className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}; 