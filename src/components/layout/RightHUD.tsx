import React from 'react';
import ReactMarkdown from 'react-markdown';

export const RightHUD: React.FC<any> = ({ messages, handleChatSubmit, PROMPT_TEMPLATES }) => {
  return (
    <div className="w-80 flex flex-col h-full bg-[var(--ks-lacquer-deep)] border-l border-[var(--ks-gold-hairline)] z-50 relative" style={{ fontFamily: 'var(--font-mono)' }}>
      {/* Header */}
      <div className="px-6 py-4">
        <h2 className="text-[var(--ks-champagne)] text-lg tracking-widest uppercase">AI Data Core</h2>
      </div>

      {/* Main Data View */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-6 flex flex-col gap-4">
        
        {/* Box 1 */}
        <div className="border border-[var(--ks-gold-hairline)] rounded-sm p-3 bg-black/20">
          <div className="text-[var(--ks-kinpaku-gold)] text-xs mb-2 border-b border-[var(--ks-gold-hairline)] pb-2 uppercase tracking-widest">
            AI ANALYSIS: NEBULA FORMATION
          </div>
          <div className="text-[var(--ks-text-muted)] text-[10px] leading-relaxed">
            Structured text<br/>
            Analysis active<br/>
            Target: Carina, Nebula<br/>
            Status: Processing spectral data..
          </div>
          {/* Recent AI Message (optional integration) */}
          {messages && messages.length > 0 && (
             <div className="mt-4 pt-4 border-t border-[var(--ks-gold-hairline)]/30 text-[10px] text-[var(--ks-champagne)] line-clamp-6">
                <ReactMarkdown>{messages[messages.length - 1]?.text}</ReactMarkdown>
             </div>
          )}
        </div>

        {/* Box 2 */}
        <div className="border border-[var(--ks-gold-hairline)] rounded-sm p-3 bg-black/20">
          <div className="text-[var(--ks-kinpaku-gold)] text-xs mb-2 border-b border-[var(--ks-gold-hairline)] pb-2 flex justify-between items-end uppercase tracking-widest">
            <span>SPECTRAL DATA</span>
            <span className="text-[8px] text-[var(--ks-text-muted)] text-right normal-case">wavelength<br/>3-20 μm</span>
          </div>
          <div className="h-28 flex items-end justify-center relative mt-4">
            <div className="absolute left-0 bottom-0 text-[8px] text-[var(--ks-text-muted)] transform -rotate-90 origin-left translate-y-6 -translate-x-1">Intensity</div>
            <svg viewBox="0 0 100 40" className="w-full h-full stroke-[var(--ks-kinpaku-gold)] fill-none overflow-visible" preserveAspectRatio="none">
               <path d="M0,35 Q5,30 10,35 T15,25 L20,30 L25,10 L30,5 L35,25 L40,15 L45,10 L50,25 L55,20 L60,28 L65,25 L75,30 L85,28 L95,35 L100,38" strokeWidth="0.5"/>
            </svg>
            <div className="absolute bottom-[-15px] left-0 right-0 flex justify-around text-[8px] text-[var(--ks-text-muted)] pl-4">
               <span>5</span><span>10</span><span>15</span><span>20</span>
            </div>
          </div>
          <div className="text-center mt-5 text-[8px] text-[var(--ks-text-muted)]">wavelength</div>
        </div>

        {/* Box 3 */}
        <div className="border border-[var(--ks-gold-hairline)] rounded-sm p-3 bg-black/20">
          <div className="text-[var(--ks-kinpaku-gold)] text-xs mb-2 border-b border-[var(--ks-gold-hairline)] pb-2 uppercase tracking-widest">
            OBSERVATION PARAMETERS
          </div>
          <div className="flex justify-between text-[10px] text-[var(--ks-text-muted)] mb-2">
            <span className="text-[var(--ks-champagne)]">NIRI</span>
            <span>7.7 μm</span>
          </div>
          <div className="flex justify-between text-[10px] text-[var(--ks-text-muted)]">
            <span>Exp: 1200s</span>
            <span>Sn: 1.4 arcsec</span>
          </div>
        </div>

        {/* Box 4 */}
        <div className="border border-[var(--ks-gold-hairline)] rounded-sm p-3 bg-black/20">
          <div className="text-[var(--ks-kinpaku-gold)] text-xs mb-2 border-b border-[var(--ks-gold-hairline)] pb-2 uppercase tracking-widest">
            ASTROPHYSICAL DATA
          </div>
          <div className="flex justify-between text-[10px] text-[var(--ks-text-muted)] mb-2">
            <span>Region:</span>
            <span className="text-[var(--ks-champagne)]">NGC 3324</span>
          </div>
          <div className="flex justify-between text-[10px] text-[var(--ks-text-muted)] mb-2">
            <span>Distance:</span>
            <span className="text-[var(--ks-champagne)]">7.5kly</span>
          </div>
          <div className="flex justify-between text-[10px] text-[var(--ks-text-muted)] mb-2">
            <span>Temp:</span>
            <span className="text-[var(--ks-champagne)]">3200K</span>
          </div>
          <div className="flex justify-between text-[10px] text-[var(--ks-text-muted)]">
            <span>Mass:</span>
            <span className="text-[var(--ks-champagne)]">45 M☉</span>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-[var(--ks-gold-hairline)] bg-[var(--ks-lacquer-deep)] mt-2">
        <div className="relative">
          <input 
            type="text" 
            className="w-full bg-transparent border border-[var(--ks-gold-hairline)] rounded-sm text-[10px] text-[var(--ks-champagne)] p-2 outline-none placeholder:text-[var(--ks-text-muted)] focus:border-[var(--ks-kinpaku-gold)] transition-colors"
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
  );
};