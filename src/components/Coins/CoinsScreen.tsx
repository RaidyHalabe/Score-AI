import { ArrowLeft, Coins } from 'lucide-react';

interface CoinsScreenProps {
  onBack: () => void;
  currentCoins: number;
  onBuyCoins: (amount: number) => void;
}

export const CoinsScreen = ({ onBack, currentCoins, onBuyCoins }: CoinsScreenProps) => {
  return (
    <div className="min-h-screen bg-black">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-green-500/20 blur-[120px] rounded-full" />
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-green-500/20 blur-[120px] rounded-full" />
      </div>

      <button
        onClick={onBack}
        className="absolute top-6 left-6 z-20 p-2 bg-[#1a1a1a] rounded-lg hover:bg-[#252525] transition-colors group border border-[#252525] hover:border-green-500/20"
      >
        <ArrowLeft className="w-6 h-6 text-gray-400 group-hover:text-green-500" />
      </button>

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-500 mb-4">Suas Moedas</h2>
          <div className="flex items-center justify-center gap-3 text-2xl text-white">
            <Coins className="w-8 h-8 text-green-500" />
            <span>{currentCoins} moedas</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#252525] hover:border-green-500/20 transition-colors text-center">
            <div className="text-2xl font-bold text-white mb-2">100 moedas</div>
            <div className="text-green-500 text-lg mb-4">R$ 10,00</div>
            <button 
              className="w-full py-2 bg-[#252525] hover:bg-[#353535] text-white rounded-lg transition-colors"
              onClick={() => onBuyCoins(100)}
            >
              Comprar
            </button>
          </div>

          <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-green-500 hover:border-green-400 transition-colors text-center relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-black text-sm font-medium px-3 py-1 rounded-full">
              Melhor Valor
            </div>
            <div className="text-2xl font-bold text-white mb-2">300 moedas</div>
            <div className="text-green-500 text-lg mb-4">R$ 25,00</div>
            <button 
              className="w-full py-2 bg-green-500 hover:bg-green-600 text-black rounded-lg transition-colors"
              onClick={() => onBuyCoins(300)}
            >
              Comprar
            </button>
          </div>

          <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#252525] hover:border-green-500/20 transition-colors text-center">
            <div className="text-2xl font-bold text-white mb-2">500 moedas</div>
            <div className="text-green-500 text-lg mb-4">R$ 40,00</div>
            <button 
              className="w-full py-2 bg-[#252525] hover:bg-[#353535] text-white rounded-lg transition-colors"
              onClick={() => onBuyCoins(500)}
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 