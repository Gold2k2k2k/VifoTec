import React from 'react';

interface TopHUDProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  onSearch: (e: React.FormEvent) => void;
  suggestions: string[];
  showSuggestions: boolean;
  onSuggestionClick: (s: string) => void;
  onFocus: () => void;
}

export const TopHUD: React.FC<TopHUDProps> = ({
  searchQuery,
  setSearchQuery,
  onSearch,
  suggestions,
  showSuggestions,
  onSuggestionClick,
  onFocus
}) => {
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-2xl font-mono">
      <div className="relative group">
        {/* HUD Scanline */}
        <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent blur opacity-50 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
        
        <form onSubmit={onSearch} className="relative flex w-full bg-[#0B0F19]/80 backdrop-blur-xl border border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.15)] rounded-none">
          {/* Decorative Corners */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400"></div>

          <div className="flex items-center pl-4 text-cyan-500 text-xs">
            <span className="animate-pulse">{'>'}</span>
          </div>

          <input 
            type="text" 
            className="w-full px-4 py-3 bg-transparent text-cyan-100 placeholder-cyan-900 focus:outline-none text-xs tracking-[0.2em] uppercase"
            placeholder="INPUT_TARGET_COORDINATES..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={onFocus}
          />
          <button 
            type="submit" 
            className="px-6 py-3 text-cyan-500 hover:text-cyan-100 transition-colors border-l border-cyan-500/30 hover:bg-cyan-900/50 text-xs font-bold tracking-[0.2em] uppercase"
          >
            SCAN
          </button>
        </form>

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[#0B0F19]/90 backdrop-blur-xl border border-cyan-500/50 shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden">
            <ul className="max-h-64 overflow-y-auto custom-scrollbar py-2">
              {suggestions.map((suggestion, idx) => (
                <li 
                  key={idx} 
                  onClick={() => onSuggestionClick(suggestion)}
                  className="px-6 py-2 hover:bg-cyan-900/50 cursor-pointer text-cyan-300 transition-colors flex items-center gap-3 text-[10px] uppercase tracking-widest border-b border-cyan-900/30 last:border-0"
                >
                  <span className="text-cyan-500">[{idx < 9 ? '0'+(idx+1) : idx+1}]</span> 
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
