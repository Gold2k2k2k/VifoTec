import React from 'react';
import ReactMarkdown from 'react-markdown';

export const RightHUD: React.FC<any> = ({ messages, handleChatSubmit, PROMPT_TEMPLATES }) => {
  return (
    <div className="w-80 flex flex-col h-full glass-panel mr-4 my-4 rounded-xl z-50 relative overflow-hidden" style={{ fontFamily: 'var(--font-mono)' }}>
      {/* Header */}
      <div className="px-6 py-5 border-b border-[var(--ks-gold-hairline)] bg-white/5 backdrop-blur-md">
        <h2 className="text-gradient font-bold text-lg tracking-[0.2em] uppercase">AI Data Core</h2>
        <div className="text-[9px] text-[var(--ks-text-muted)] tracking-widest mt-1">ANALYSIS SYSTEM ACTIVE</div>
      </div>

      {/* Main Data View */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-4 flex flex-col gap-5">
        
        {/* Box 1 */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover-glow transition-all duration-300 group">
          <div className="text-[var(--ks-kinpaku-gold)] text-xs mb-3 border-b border-[var(--ks-gold-hairline)] pb-2 uppercase tracking-widest font-bold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--ks-kinpaku-gold)] animate-pulse shadow-[0_0_8px_var(--ks-kinpaku-gold)]"></span>
            NEBULA FORMATION
          </div>
          <div className="text-[var(--ks-champagne)] opacity-80 text-[10px] leading-relaxed">
            Structured text<br/>
            Analysis active<br/>
            Target: <span className="text-white font-bold">Carina Nebula</span><br/>
            Status: <span className="text-emerald-400">Processing spectral data..</span>
          </div>
          {/* Recent AI Message (optional integration) */}
          {messages && messages.length > 0 && (
             <div className="mt-4 pt-4 border-t border-white/10 text-[10px] text-[var(--ks-champagne)] line-clamp-6 leading-relaxed bg-black/20 p-2 rounded">
                <ReactMarkdown>{messages[messages.length - 1]?.text}</ReactMarkdown>
             </div>
          )}
        </div>

        {/* Box 2 */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover-glow transition-all duration-300">
          <div className="text-[var(--ks-kinpaku-gold)] text-xs mb-3 border-b border-[var(--ks-gold-hairline)] pb-2 flex justify-between items-end uppercase tracking-widest font-bold">
            <span>SPECTRAL DATA</span>
            <span className="text-[8px] text-[var(--ks-text-muted)] text-right normal-case opacity-60">wavelength<br/>3-20 μm</span>
          </div>
          <div className="h-28 flex items-end justify-center relative mt-4">
            <div className="absolute left-0 bottom-0 text-[8px] text-[var(--ks-text-muted)] transform -rotate-90 origin-left translate-y-6 -translate-x-1 opacity-60">Intensity</div>
            <svg viewBox="0 0 100 40" className="w-full h-full stroke-[var(--ks-kinpaku-gold)] fill-none overflow-visible drop-shadow-[0_0_5px_rgba(212,175,55,0.8)]" preserveAspectRatio="none">
               <path d="M0,35 Q5,30 10,35 T15,25 L20,30 L25,10 L30,5 L35,25 L40,15 L45,10 L50,25 L55,20 L60,28 L65,25 L75,30 L85,28 L95,35 L100,38" strokeWidth="0.8" className="animate-[dash_5s_linear_infinite]" strokeDasharray="100" strokeDashoffset="0" />
            </svg>
            <div className="absolute bottom-[-15px] left-0 right-0 flex justify-around text-[8px] text-[var(--ks-text-muted)] pl-4 opacity-60">
               <span>5</span><span>10</span><span>15</span><span>20</span>
            </div>
          </div>
          <div className="text-center mt-6 text-[8px] text-[var(--ks-text-muted)] opacity-60">wavelength</div>
        </div>

        {/* Box 3 */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover-glow transition-all duration-300">
          <div className="text-[var(--ks-kinpaku-gold)] text-xs mb-3 border-b border-[var(--ks-gold-hairline)] pb-2 uppercase tracking-widest font-bold">
            OBSERVATION PARAMETERS
          </div>
          <div className="flex justify-between text-[11px] text-[var(--ks-text-muted)] mb-2">
            <span className="text-[var(--ks-champagne)] font-bold">NIRI</span>
            <span className="text-emerald-400">7.7 μm</span>
          </div>
          <div className="flex justify-between text-[11px] text-[var(--ks-text-muted)]">
            <span>Exp: <span className="text-white">1200s</span></span>
            <span>Sn: <span className="text-white">1.4 arcsec</span></span>
          </div>
        </div>

        {/* Box 4 */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover-glow transition-all duration-300">
          <div className="text-[var(--ks-kinpaku-gold)] text-xs mb-3 border-b border-[var(--ks-gold-hairline)] pb-2 uppercase tracking-widest font-bold">
            ASTROPHYSICAL DATA
          </div>
          <div className="flex justify-between text-[11px] text-[var(--ks-text-muted)] mb-2 border-b border-white/5 pb-1">
            <span>Region:</span>
            <span className="text-[var(--ks-champagne)] font-bold drop-shadow-md">NGC 3324</span>
          </div>
          <div className="flex justify-between text-[11px] text-[var(--ks-text-muted)] mb-2 border-b border-white/5 pb-1">
            <span>Distance:</span>
            <span className="text-[var(--ks-champagne)] font-bold drop-shadow-md">7.5kly</span>
          </div>
          <div className="flex justify-between text-[11px] text-[var(--ks-text-muted)] mb-2 border-b border-white/5 pb-1">
            <span>Temp:</span>
            <span className="text-[var(--ks-champagne)] font-bold drop-shadow-md">3200K</span>
          </div>
          <div className="flex justify-between text-[11px] text-[var(--ks-text-muted)]">
            <span>Mass:</span>
            <span className="text-[var(--ks-champagne)] font-bold drop-shadow-md">45 M☉</span>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-[var(--ks-gold-hairline)] bg-white/5 backdrop-blur-md">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--ks-kinpaku-gold)]/20 to-transparent rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
          <div className="relative glass-pill border-white/20 focus-within:border-[var(--ks-kinpaku-gold)] transition-colors rounded-lg overflow-hidden flex items-center p-1">
            <div className="p-2 text-[var(--ks-kinpaku-gold)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </div>
            <input 
              type="text" 
              className="w-full bg-transparent text-[11px] text-[var(--ks-champagne)] px-2 py-2 outline-none placeholder:text-[var(--ks-text-muted)] tracking-widest uppercase"
              placeholder="ENTER QUERY..." 
              onKeyDown={(e) => { 
                if (e.key === 'Enter') {
                  handleChatSubmit(e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};