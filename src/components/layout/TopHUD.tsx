import React, { useState, useEffect } from 'react';
import { IconTelescope } from '../Icons';

export const TopHUD: React.FC<any> = ({ executeSearch, activeLayer }) => {
  const [time, setTime] = useState('');
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toISOString().substring(11,19) + ' UTC'), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--ks-gold-hairline)] bg-[var(--ks-lacquer-deep)] z-50 relative">
      {/* Left: Brand */}
      <div className="flex items-center gap-4">
        <IconTelescope size={32} className="text-[var(--ks-text-muted)]" />
        <div className="flex flex-col">
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', lineHeight: '1', letterSpacing: '0.05em' }} className="text-[var(--ks-champagne)]">JWST</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em' }} className="text-[var(--ks-kinpaku-gold)]">Space Explorer</span>
        </div>
      </div>
      
      {/* Center Search */}
      <div className="flex-1 max-w-lg mx-8 hidden md:block">
        <div className="relative">
          <input 
            type="text" 
            className="w-full bg-black/40 border border-[var(--ks-gold-hairline)] rounded-sm text-[10px] text-[var(--ks-champagne)] px-4 py-2 outline-none placeholder:text-[var(--ks-text-muted)] focus:border-[var(--ks-kinpaku-gold)] transition-colors tracking-widest uppercase"
            placeholder="Search celestial targets (M101, Orion)..." 
            onKeyDown={(e) => { 
              if (e.key === 'Enter') {
                executeSearch(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }} 
          />
        </div>
      </div>
      
      {/* Right: User / Status / Time */}
      <div className="flex items-center gap-4" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
        <div className="px-4 py-1.5 border border-[var(--ks-gold-hairline)] rounded-sm text-[var(--ks-text-muted)] flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border border-[var(--ks-text-muted)] flex items-center justify-center text-[10px]">👤</div>
          A. Dubois
        </div>
        <div className="px-4 py-1.5 border border-[var(--ks-gold-hairline)] rounded-sm text-emerald-400/80 tracking-widest">
          ONLINE
        </div>
        <div className="px-4 py-1.5 border border-[var(--ks-gold-hairline)] rounded-sm text-[var(--ks-text-muted)] tracking-widest">
          {time || '14:32:01 UTC'}
        </div>
      </div>
    </div>
  );
};
