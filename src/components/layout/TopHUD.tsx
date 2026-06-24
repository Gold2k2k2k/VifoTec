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
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-2xl">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-fuchsia-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <form onSubmit={onSearch} className="relative flex w-full bg-slate-950/80 backdrop-blur-xl border border-slate-700/50 rounded-full shadow-2xl">
          <input 
            type="text" 
            className="w-full px-6 py-3 bg-transparent text-slate-100 placeholder-slate-400 focus:outline-none rounded-l-full text-sm font-medium tracking-wide"
            placeholder="Tìm kiếm mục tiêu thiên văn (e.g. M31, Orion...)" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={onFocus}
          />
          <button 
            type="submit" 
            className="px-6 py-3 text-slate-300 hover:text-white transition-colors border-l border-slate-700/50 hover:bg-slate-800/50 rounded-r-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden">
            <ul className="max-h-64 overflow-y-auto custom-scrollbar py-2">
              {suggestions.map((suggestion, idx) => (
                <li 
                  key={idx} 
                  onClick={() => onSuggestionClick(suggestion)}
                  className="px-6 py-2 hover:bg-blue-600/30 cursor-pointer text-slate-300 transition-colors flex items-center gap-3 text-sm"
                >
                  <span className="text-blue-400 text-xs">✨</span> 
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
