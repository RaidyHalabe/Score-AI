import { Check, ArrowLeft } from 'lucide-react';

export const PlansScreen = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen bg-black">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-green-500/20 blur-[120px] rounded-full" />
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-green-500/20 blur-[120px] rounded-full" />
      </div>

      {/* Botão Voltar */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 z-20 p-2 bg-[#1a1a1a] rounded-lg hover:bg-[#252525] transition-colors group border border-[#252525] hover:border-green-500/20"
      >
        <ArrowLeft className="w-6 h-6 text-gray-400 group-hover:text-green-500" />
      </button>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-green-500 text-center mb-4 select-none">Nossos Planos</h2>
        <p className="text-gray-400 text-center mb-12 select-none">Escolha o plano ideal para suas necessidades</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Plano Gratuito */}
          <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-[#252525] hover:border-green-500/20 transition-colors flex flex-col">
            <h3 className="text-xl font-medium text-green-500 mb-2">Gratuito</h3>
            <p className="text-gray-400 text-sm mb-4">Perfeito para começar</p>
            <div className="text-3xl font-bold text-white mb-6">
              R$ 0<span className="text-gray-400 text-sm font-normal">/mês</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-center text-sm text-gray-400">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Análises básicas de partidas
              </li>
              <li className="flex items-center text-sm text-gray-400">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Previsões limitadas
              </li>
              <li className="flex items-center text-sm text-gray-400">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Acesso à comunidade
              </li>
            </ul>
            <button className="w-full py-3 bg-[#252525] hover:bg-[#353535] text-white rounded-lg transition-colors">
              Começar Grátis
            </button>
          </div>

          {/* Plano Pro */}
          <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-green-500 hover:border-green-400 transition-colors relative flex flex-col">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-black text-sm font-medium px-3 py-1 rounded-full">
              Mais Popular
            </div>
            <h3 className="text-xl font-medium text-green-500 mb-2">Pro</h3>
            <p className="text-gray-400 text-sm mb-4">Para usuários avançados</p>
            <div className="text-3xl font-bold text-white mb-6">
              R$ 49<span className="text-gray-400 text-sm font-normal">/mês</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-center text-sm text-gray-400">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Todas as análises básicas
              </li>
              <li className="flex items-center text-sm text-gray-400">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Previsões ilimitadas
              </li>
              <li className="flex items-center text-sm text-gray-400">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Análises detalhadas de jogadores
              </li>
              <li className="flex items-center text-sm text-gray-400">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Suporte prioritário
              </li>
            </ul>
            <button className="w-full py-3 bg-green-500 hover:bg-green-600 text-black font-medium rounded-lg transition-colors">
              Começar Agora
            </button>
          </div>

          {/* Plano Enterprise */}
          <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-[#252525] hover:border-green-500/20 transition-colors flex flex-col">
            <h3 className="text-xl font-medium text-green-500 mb-2">Enterprise</h3>
            <p className="text-gray-400 text-sm mb-4">Para times e empresas</p>
            <div className="text-3xl font-bold text-white mb-6">
              Personalizado
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              <li className="flex items-center text-sm text-gray-400">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Todas as funcionalidades Pro
              </li>
              <li className="flex items-center text-sm text-gray-400">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                API dedicada
              </li>
              <li className="flex items-center text-sm text-gray-400">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Suporte 24/7
              </li>
              <li className="flex items-center text-sm text-gray-400">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                Contrato personalizado
              </li>
            </ul>
            <button className="w-full py-3 bg-[#252525] hover:bg-[#353535] text-white rounded-lg transition-colors">
              Fale Conosco
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 