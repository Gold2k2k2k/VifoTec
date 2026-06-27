import React, { useState, useRef, useEffect } from 'react';
import { IconSearch } from '../Icons';
import { POPULAR_TARGETS } from '../../data';

interface TopHUDProps {
  executeSearch: (query: string) => void;
  activeLayer?: string;
}

export const TopHUD: React.FC<TopHUDProps> = ({
  executeSearch,
  activeLayer = 'deepsky'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim().length > 0) {
      setSuggestions(POPULAR_TARGETS.filter(t => t.toLowerCase().includes(value.toLowerCase())));
      setShowSuggestions(true);
    } else setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => { 
    const query = suggestion.split(" (")[0];
    setSearchQuery(query); 
    setShowSuggestions(false); 
    executeSearch(query);
  };

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeSearch(searchQuery);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-[80] h-16 flex items-center justify-between px-8 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
      
      {/* Left Area - Brand */}
      <div className="flex items-center gap-6 pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-white/90 animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
          <h1 className="text-lg font-light tracking-widest text-white/90 uppercase" style={{ fontFamily: 'var(--font-heading)' }}>
            JWST <span className="text-white/50 font-normal">Explorer</span>
          </h1>
        </div>
        <div className="w-px h-5 bg-white/20"></div>
        <span className="text-xs text-white/40 tracking-[0.2em] uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
          NASA MAST
        </span>
      </div>

      {/* Center Area - Expansive Search */}
      <div className="flex-1 max-w-2xl mx-12 pointer-events-auto relative" ref={searchContainerRef}>
        <form onSubmit={onSearchSubmit} className="relative flex items-center bg-white/[0.03] hover:bg-white/[0.05] focus-within:bg-white/[0.08] border border-white/10 rounded-lg transition-all duration-300 backdrop-blur-md">
          <div className="pl-4 pr-3 text-white/40">
            <IconSearch size={18} />
          </div>
          <input 
            type="text" 
            className="w-full bg-transparent border-none outline-none text-white/90 font-mono text-sm tracking-widest placeholder-white/30 py-3"
            placeholder="Search celestial targets (M101, Orion, Carina...)" 
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => { if (searchQuery.trim().length > 0) setShowSuggestions(true); }}
          />
          <button 
            type="submit" 
            className="mr-2 px-6 py-2 bg-white/10 hover:bg-white/20 text-white/90 transition-all duration-300 text-xs uppercase tracking-[0.2em] rounded-md cursor-pointer border border-white/5"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Scan
          </button>
        </form>

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-lg overflow-hidden shadow-2xl">
            <ul className="max-h-[400px] overflow-y-auto custom-scrollbar py-2">
              {suggestions.map((suggestion, idx) => (
                <li 
                  key={idx} 
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-6 py-4 hover:bg-white/5 cursor-pointer text-white/70 hover:text-white transition-colors flex items-center gap-4 text-sm border-b border-white/5 last:border-0"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  <span className="text-white/30 text-xs w-8 uppercase tracking-widest">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="uppercase tracking-widest">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Area - Status */}
      <div className="flex items-center gap-6 pointer-events-auto" style={{ fontFamily: 'var(--font-mono)' }}>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/60 tracking-[0.2em] uppercase">Status</span>
          <span className="text-xs text-white/90 tracking-[0.2em] uppercase">Online</span>
        </div>
        <div className="w-px h-5 bg-white/20"></div>
        <div className="text-xs text-white/40 tracking-[0.2em] uppercase">
          Layer: {activeLayer}
        </div>
      </div>
    </header>
  );
};
