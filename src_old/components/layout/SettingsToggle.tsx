import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

export const SettingsToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { i18n } = useTranslation();

  const toggleLang = () => i18n.changeLanguage(i18n.language === 'vi' ? 'en' : 'vi');

  return (
    <div className="absolute top-4 right-4 z-50 flex gap-2 glass-pill px-2 py-1">
      <button onClick={toggleLang} className="px-3 py-1.5 text-[10px] font-mono text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10">
        {i18n.language === 'vi' ? 'EN' : 'VI'}
      </button>
      <div className="w-[1px] h-4 bg-white/10 self-center"></div>
      <button onClick={toggleTheme} className="px-3 py-1.5 text-[10px] font-mono text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10">
        {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
      </button>
    </div>
  );
};
