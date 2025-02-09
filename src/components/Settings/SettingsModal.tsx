import { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal = ({ onClose }: SettingsModalProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 200); // Tempo da animação
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as 'en' | 'pt');
  };

  return (
    <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
      <div className={`bg-[#252525] p-4 rounded-2xl w-[525px] h-[263px] shadow-lg ${isClosing ? 'animate-fadeOut' : 'animate-scaleIn'}`}>
        <div className="bg-[#252525] rounded-lg w-full overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#353535]">
            <h2 className="text-base font-medium text-[#f5f5f5]">{t('settings.title')}</h2>
            <button 
              onClick={handleClose}
              className="p-1 hover:bg-[#353535] rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-[#f5f5f5] hover:text-white" />
            </button>
          </div>

          <div className="p-4">
            <div className="flex bg-[#2b2b2b] rounded-md mb-8">
              <button 
                className="flex-1 py-1.5 text-sm text-[#f5f5f5] bg-[#353535] rounded-md"
              >
                {t('settings.general')}
              </button>
              <button 
                className="flex-1 py-1.5 text-sm text-[#f5f5f5]"
              >
                {t('settings.profile')}
              </button>
            </div>

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#f5f5f5]">{t('settings.language')}</span>
                <select 
                  className="bg-[#2b2b2b] text-sm text-[#f5f5f5] px-4 py-1.5 rounded-md outline-none cursor-pointer"
                  value={language}
                  onChange={handleLanguageChange}
                >
                  <option value="en">English</option>
                  <option value="pt">Português</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-[#f5f5f5]">{t('settings.theme')}</span>
                <select 
                  value={theme}
                  onChange={(e) => toggleTheme(e.target.value as 'dark' | 'light')}
                  className="bg-[#2b2b2b] text-sm text-[#f5f5f5] px-4 py-1.5 rounded-md outline-none cursor-pointer"
                >
                  <option value="dark">{t('common.dark')}</option>
                  <option value="light">{t('common.light')}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 