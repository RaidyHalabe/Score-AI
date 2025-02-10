import { useLanguage } from '../../contexts/LanguageContext';

export function SettingsScreen() {
  const { t, language, setLanguage } = useLanguage();
  const theme = 'dark'; // Forçar tema escuro

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="space-y-8">
        {/* Geral */}
        <div>
          <h2 className="text-lg font-medium text-white mb-4">{t('settings.general')}</h2>
          <div className="space-y-4">
            {/* Idioma */}
            <div className="flex items-center justify-between">
              <label className="text-sm text-[#A3A3A3]">{t('settings.language')}</label>
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-[#252525] text-[#A3A3A3] text-sm rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-green-500"
              >
                <option value="en">{t('common.english')}</option>
                <option value="pt">{t('common.portuguese')}</option>
              </select>
            </div>

            {/* Tema */}
            <div className="flex items-center justify-between">
              <label className="text-sm text-[#A3A3A3]">{t('settings.theme')}</label>
              <div className="bg-[#252525] text-[#A3A3A3] text-sm rounded-lg px-3 py-2">
                {t('common.dark')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 