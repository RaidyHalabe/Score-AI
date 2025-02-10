import { Mail, Github } from 'lucide-react';
import { useState } from 'react';
import { PlansScreen } from '../Plans/PlansScreen';
import { useLanguage } from '../../contexts/LanguageContext';

export const LandingPage = ({ onStartClick }: { onStartClick: () => void }) => {
  const [showPlans, setShowPlans] = useState(false);
  const { t } = useLanguage();

  if (showPlans) {
    return <PlansScreen onBack={() => setShowPlans(false)} />;
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-green-500/20 blur-[120px] rounded-full" />
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-green-500/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="py-6">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-3xl font-bold text-green-500 select-none">
              Score AI
            </div>
          </div>
        </header>

        {/* Conteúdo principal */}
        <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-green-500 mb-4 select-none">
              {t('landing.title')}
            </h2>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 mt-8">
              {t('landing.subtitle')}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto mt-16">
              <div 
                onClick={onStartClick}
                className="bg-[#1a1a1a] p-8 rounded-2xl border border-[#252525] hover:border-green-500/20 transition-colors cursor-pointer group"
              >
                <h3 className="text-xl font-medium text-green-500 mb-4 transition-colors text-left">
                  {t('landing.startNow')}
                </h3>
                <p className="text-sm text-gray-400 text-left">
                  {t('landing.startDesc')}
                </p>
              </div>

              <div 
                onClick={() => setShowPlans(true)}
                className="bg-[#1a1a1a] p-8 rounded-2xl border border-[#252525] hover:border-green-500/20 transition-colors cursor-pointer group"
              >
                <h3 className="text-xl font-medium text-green-500 mb-4 transition-colors text-left">
                  {t('landing.knowPlans')}
                </h3>
                <p className="text-sm text-gray-400 text-left">
                  {t('landing.plansDesc')}
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto py-12 border-t border-[#252525]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Logo e Redes Sociais */}
              <div className="col-span-1">
                <div className="text-2xl font-bold text-green-500 mb-4 select-none">
                  Score AI
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="w-5 h-5 text-gray-400 hover:text-green-500 cursor-pointer" />
                  <Github className="w-5 h-5 text-gray-400 hover:text-green-500 cursor-pointer" />
                </div>
                <p className="text-sm text-gray-400 mt-4">
                  {t('landing.copyright')}
                </p>
              </div>

              {/* Pesquisar */}
              <div>
                <h3 className="text-white font-medium mb-4">{t('landing.research')}</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-[#A3A3A3] hover:text-green-500 transition-colors">{t('landing.masteringAI')}</a></li>
                  <li><a href="#" className="text-sm text-[#A3A3A3] hover:text-green-500 transition-colors">{t('landing.scoreAICoder')}</a></li>
                  <li><a href="#" className="text-sm text-[#A3A3A3] hover:text-green-500 transition-colors">{t('landing.scoreAIMath')}</a></li>
                  <li><a href="#" className="text-sm text-[#A3A3A3] hover:text-green-500 transition-colors">{t('landing.scoreAIV3')}</a></li>
                </ul>
              </div>

              {/* Produto */}
              <div>
                <h3 className="text-white font-medium mb-4">{t('landing.product')}</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-[#A3A3A3] hover:text-green-500 transition-colors">{t('landing.scoreAIApp')}</a></li>
                  <li><a href="#" className="text-sm text-[#A3A3A3] hover:text-green-500 transition-colors">{t('landing.scoreAIPlatform')}</a></li>
                  <li><a href="#" className="text-sm text-[#A3A3A3] hover:text-green-500 transition-colors">{t('landing.apiPricing')}</a></li>
                  <li><a href="#" className="text-sm text-[#A3A3A3] hover:text-green-500 transition-colors">{t('landing.serviceStatus')}</a></li>
                </ul>
              </div>

              {/* Jurídico e Segurança */}
              <div>
                <h3 className="text-white font-medium mb-4">{t('landing.legal')}</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-[#A3A3A3] hover:text-green-500 transition-colors">{t('landing.privacyPolicy')}</a></li>
                  <li><a href="#" className="text-sm text-[#A3A3A3] hover:text-green-500 transition-colors">{t('landing.terms')}</a></li>
                  <li><a href="#" className="text-sm text-[#A3A3A3] hover:text-green-500 transition-colors">{t('landing.reportVulnerabilities')}</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}; 