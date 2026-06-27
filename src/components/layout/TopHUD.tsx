import React, { useState } from 'react';

export const TopHUD: React.FC<any> = ({ executeSearch, activeLayer }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="absolute top-0 left-0 right-0 h-16 bg-[var(--ks-lacquer-deep)] border-b border-[var(--ks-gold-hairline)] flex items-center px-6 justify-between z-[100]">
      {/* Brand */}
      <div className="flex items-center gap-4">
        {/* Carved-tile glyph simulation */}
        <div className="w-8 h-8 bg-[var(--ks-kinpaku-gold)] flex items-center justify-center">
          <div className="w-full h-px bg-[var(--ks-lacquer-deep)] transform rotate-45"></div>
        </div>
        <div style={{ fontFamily: 'var(--font-wordmark)', fontSize: '1.3rem', letterSpacing: '0.15em', fontWeight: 400, textTransform: 'uppercase' }} className="text-[var(--ks-kinpaku-gold)]">
          IMPECCABLE <span className="text-[var(--ks-text-muted)]">JWST</span>
        </div>
      </div>

      {/* Center Search (Graphite Input) */}
      <div className="flex-1 max-w-xl mx-8">
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            className="flex-1 ks-input"
            placeholder="Search celestial targets (M101, Orion)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => { 
              if (e.key === 'Enter') {
                executeSearch(searchQuery);
                setSearchQuery('');
              }
            }} 
          />
          <button 
            className="ks-button ks-button-secondary !min-h-[48px] !px-6"
            onClick={() => { executeSearch(searchQuery); setSearchQuery(''); }}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.22em' }}
          >
            SCAN
          </button>
        </div>
      </div>

      {/* Right Meta */}
      <div className="flex items-center gap-4" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
        <div className="flex items-center gap-2">
          <span className="text-[var(--ks-text-muted)]">STATUS</span>
          <span className="text-[var(--ks-verdigris-patina)]">ONLINE</span>
        </div>
        <div className="w-px h-4 bg-[var(--ks-gold-hairline)]"></div>
        <div className="text-[var(--ks-text-muted)]">
          LAYER: {activeLayer}
        </div>
      </div>
    </div>
  );
};
