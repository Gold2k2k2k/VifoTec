import React from 'react';
import { IconTelescope, IconRadar, IconGallery, IconStar, IconPanel, IconSearch } from '../Icons';

export const LeftHUD: React.FC<any> = ({ controls, handleDownload, toggleSonification, generateCitizenReport, setShowQuiz }) => {
  return (
    <div className="w-16 bg-[var(--ks-lacquer-deep)] flex flex-col items-center py-6 justify-between z-50 relative">
      <div className="flex flex-col items-center gap-5 w-full">
        <button className="text-[var(--ks-text-muted)] hover:text-[var(--ks-kinpaku-gold)] transition-colors"><IconTelescope size={20} /></button>
        <div className="w-8 h-px bg-[var(--ks-gold-hairline)] opacity-30"></div>
        <button className="text-[var(--ks-text-muted)] hover:text-[var(--ks-kinpaku-gold)] transition-colors"><IconRadar size={20} /></button>
        <div className="w-8 h-px bg-[var(--ks-gold-hairline)] opacity-30"></div>
        <button className="text-[var(--ks-text-muted)] hover:text-[var(--ks-kinpaku-gold)] transition-colors"><IconGallery size={20} /></button>
        <div className="w-8 h-px bg-[var(--ks-gold-hairline)] opacity-30"></div>
        <button className="text-[var(--ks-text-muted)] hover:text-[var(--ks-kinpaku-gold)] transition-colors" onClick={toggleSonification}><IconStar size={20} /></button>
        <div className="w-8 h-px bg-[var(--ks-gold-hairline)] opacity-30"></div>
        <button className="text-[var(--ks-text-muted)] hover:text-[var(--ks-kinpaku-gold)] transition-colors" onClick={generateCitizenReport}><IconSearch size={20} /></button>
        <div className="w-8 h-px bg-[var(--ks-gold-hairline)] opacity-30"></div>
      </div>
      <div className="flex flex-col items-center gap-5 w-full">
         <div className="w-8 h-px bg-[var(--ks-gold-hairline)] opacity-30"></div>
         <button className="text-[var(--ks-text-muted)] hover:text-[var(--ks-kinpaku-gold)] transition-colors" onClick={() => setShowQuiz(true)}><IconPanel size={20} /></button>
      </div>
    </div>
  );
};
