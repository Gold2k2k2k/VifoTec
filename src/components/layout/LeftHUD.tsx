import React from 'react';
import { IconSearch, IconPanel, IconStar } from '../Icons';

export const LeftHUD: React.FC<any> = ({ controls, handleDownload, toggleSonification, generateCitizenReport, setShowQuiz }) => {
  return (
    <div className="w-20 glass-panel flex flex-col items-center py-8 justify-between z-50 relative ml-4 my-4 rounded-xl">
      <div className="flex flex-col items-center gap-6 w-full px-2">
        {controls.map((ctrl: any, idx: number) => (
          <React.Fragment key={ctrl.type}>
            <button 
              onClick={ctrl.action}
              title={ctrl.title}
              className="p-3 rounded-full text-[var(--ks-text-muted)] bg-transparent hover:bg-white/10 hover:text-[var(--ks-kinpaku-gold)] hover-glow hover:scale-110 active:scale-95 transition-all duration-300"
            >
              {ctrl.icon}
            </button>
            {idx < controls.length - 1 && (
              <div className="w-10 h-px bg-gradient-to-r from-transparent via-[var(--ks-gold-hairline-strong)] to-transparent opacity-40"></div>
            )}
          </React.Fragment>
        ))}
        
        {/* Additional Tools Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--ks-champagne)] to-transparent opacity-30 my-2"></div>
        
        <button 
          onClick={generateCitizenReport}
          title="Citizen Report"
          className="p-3 rounded-full text-[var(--ks-text-muted)] bg-transparent hover:bg-white/10 hover:text-[var(--ks-champagne)] hover-glow hover:scale-110 active:scale-95 transition-all duration-300"
        >
          <IconSearch size={20} />
        </button>
        <div className="w-10 h-px bg-gradient-to-r from-transparent via-[var(--ks-gold-hairline-strong)] to-transparent opacity-40"></div>
        <button 
          onClick={handleDownload}
          title="Download Image"
          className="p-3 rounded-full text-[var(--ks-text-muted)] bg-transparent hover:bg-white/10 hover:text-emerald-400 hover:shadow-[0_0_15px_#34d399] hover:scale-110 active:scale-95 transition-all duration-300"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
        </button>
      </div>

      <div className="flex flex-col items-center gap-6 w-full px-2">
         <div className="w-10 h-px bg-gradient-to-r from-transparent via-[var(--ks-gold-hairline-strong)] to-transparent opacity-40"></div>
         <button 
           onClick={() => setShowQuiz(true)}
           title="Space Quiz"
           className="p-3 rounded-full text-[var(--ks-kinpaku-gold)] bg-[var(--ks-kinpaku-gold)]/10 hover:bg-[var(--ks-kinpaku-gold)]/30 hover:shadow-[0_0_20px_var(--ks-kinpaku-gold)] hover:scale-110 active:scale-95 transition-all duration-300"
         >
           <IconPanel size={20} />
         </button>
      </div>
    </div>
  );
};
