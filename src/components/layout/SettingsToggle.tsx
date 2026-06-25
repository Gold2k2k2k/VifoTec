import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

export const SettingsToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { i18n } = useTranslation();

  const toggleLang = () => i18n.changeLanguage(i18n.language === 'vi' ? 'en' : 'vi');

  return (
    <div className="absolute top-4 right-4 z-50 flex gap-2">
      <button onClick={toggleLang} className="px-3 py-1 text-xs font-mono border border-cyan-500/30 text-cyan-400 rounded-sm hover:bg-cyan-500/20 backdrop-blur-sm transition-colors">
        {i18n.language === 'vi' ? 'EN' : 'VI'}
      </button>
      <button onClick={toggleTheme} className="px-3 py-1 text-xs font-mono border border-cyan-500/30 text-cyan-400 rounded-sm hover:bg-cyan-500/20 backdrop-blur-sm transition-colors">
        {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
      </button>
    </div>
  );
};
