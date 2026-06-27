import React, { useState, useEffect } from 'react';
import { IconTelescope, IconSearch } from '../Icons';

export const TopHUD: React.FC<any> = ({ executeSearch, activeLayer }) => {
  const [time, setTime] = useState('');
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toISOString().substring(11,19) + ' UTC'), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="glass-panel mx-4 mt-4 mb-2 rounded-xl flex items-center justify-between px-8 py-4 z-50 relative">
      {/* Left: Brand */}
      <div className="flex items-center gap-4 group cursor-pointer">
        <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors shadow-[0_0_15px_rgba(212,175,55,0.1)]">
          <IconTelescope size={28} className="text-[var(--ks-kinpaku-gold)]" />
        </div>
        <div className="flex flex-col">
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', lineHeight: '1', letterSpacing: '0.08em' }} className="text-gradient font-bold drop-shadow-md">JWST</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em' }} className="text-[var(--ks-champagne)] opacity-80 uppercase">Space Explorer</span>
        </div>
      </div>
      
      {/* Center Search */}
      <div className="flex-1 max-w-xl mx-8 hidden md:block">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--ks-kinpaku-gold)]/20 via-[var(--ks-champagne)]/20 to-[var(--ks-kinpaku-gold)]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
          <div className="glass-pill relative flex items-center px-6 py-2 focus-within:border-[var(--ks-kinpaku-gold)] transition-all duration-300">
            <IconSearch size={16} className="text-[var(--ks-text-muted)] mr-3" />
            <input 
              type="text" 
              className="w-full bg-transparent text-[11px] text-[var(--ks-champagne)] outline-none placeholder:text-[var(--ks-text-muted)] tracking-widest uppercase font-mono"
              placeholder="Search celestial targets (M101, Orion)..." 
              onKeyDown={(e) => { 
                if (e.key === 'Enter') {
                  executeSearch(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }} 
            />
            <div className="text-[9px] text-[var(--ks-text-muted)] border border-[var(--ks-gold-hairline)] px-2 py-0.5 rounded ml-3">ENTER</div>
          </div>
        </div>
      </div>
      
      {/* Right: User / Status / Time */}
      <div className="flex items-center gap-4" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.15em' }}>
        <div className="glass-pill px-5 py-2 text-[var(--ks-champagne)] flex items-center gap-3 hover-glow cursor-pointer transition-all">
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[var(--ks-kinpaku-gold)] to-[var(--ks-champagne)] flex items-center justify-center text-[10px] text-black font-bold">A</div>
          <span className="uppercase text-[10px]">A. Dubois</span>
        </div>
        <div className="glass-pill px-5 py-2 text-emerald-400 font-bold uppercase text-[10px] flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]"></div>
          ONLINE
        </div>
        <div className="glass-pill px-5 py-2 text-[var(--ks-kinpaku-gold)] font-bold text-[10px]">
          {time || '14:32:01 UTC'}
        </div>
      </div>
    </div>
  );
};
