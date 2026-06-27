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
    <header className="absolute top-6 left-6 right-6 z-[100] flex items-center justify-between pointer-events-none">
      {/* Logo / Title - Floating Glass Pill */}
      <div className="glass-pill px-5 py-3 flex items-center gap-4 pointer-events-auto shrink-0 border-white/5">
        <div className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        <h1 className="text-sm font-light tracking-widest text-white/90 hidden md:block uppercase" style={{ fontFamily: 'var(--font-heading)' }}>
          JWST <span className="text-white/50 font-normal">Explorer</span>
        </h1>
        <div className="w-px h-4 bg-white/10 hidden lg:block"></div>
        <span className="text-[10px] text-white/30 hidden lg:block tracking-[0.2em] uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
          v2.0
        </span>
      </div>

      {/* Search Bar — Center Floating Pill */}
      <div className="relative flex-1 max-w-xl mx-6 pointer-events-auto" ref={searchContainerRef}>
        <form onSubmit={onSearchSubmit} className="relative flex items-center glass-pill px-2 py-1 focus-within:bg-white/[0.05] focus-within:border-white/10 transition-all duration-300">
          <div className="pl-4 pr-3 text-white/30">
            <IconSearch size={16} />
          </div>
          <input 
            type="text" 
            className="w-full bg-transparent border-none outline-none text-white/90 font-mono text-xs tracking-widest placeholder-white/20 py-2.5"
            placeholder="Search targets... (M101, Orion, Carina...)" 
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => { if (searchQuery.trim().length > 0) setShowSuggestions(true); }}
            aria-label="Search celestial targets"
            aria-autocomplete="list"
          />
          <button 
            type="submit" 
            className="ml-2 px-5 py-2 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-all duration-300 text-[10px] uppercase tracking-[0.2em] rounded-full cursor-pointer border border-white/5"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Scan
          </button>
        </form>

        {showSuggestions && suggestions.length > 0 && (
          <div 
            className="absolute top-full left-0 right-0 mt-3 glass-panel border-white/5 overflow-hidden shadow-2xl"
            role="listbox"
          >
            <ul className="max-h-64 overflow-y-auto custom-scrollbar py-2">
              {suggestions.map((suggestion, idx) => (
                <li 
                  key={idx} 
                  role="option"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-6 py-3 hover:bg-white/5 cursor-pointer text-white/60 hover:text-white transition-colors flex items-center gap-4 text-xs border-b border-white/5 last:border-0"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  <span className="text-white/20 text-[10px] w-6 uppercase tracking-widest">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="uppercase tracking-widest">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Status indicators — Right Floating Pill */}
      <div className="glass-pill px-5 py-3 flex items-center gap-4 pointer-events-auto shrink-0 border-white/5" style={{ fontFamily: 'var(--font-mono)' }}>
        <div className="hidden md:flex items-center gap-2 text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          <span className="text-white/60 tracking-[0.2em] uppercase">Online</span>
        </div>
        <div className="w-px h-4 bg-white/10 hidden lg:block"></div>
        <div className="hidden lg:block text-[10px] text-white/40 tracking-[0.2em] uppercase">
          {activeLayer}
        </div>
      </div>
    </header>
  );
};
