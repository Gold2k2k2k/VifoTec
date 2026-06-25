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
    <header className="absolute top-0 left-0 right-0 z-[100] flex items-center justify-between px-4 h-14 bg-[#0B0B10]/80 backdrop-blur-xl border-b border-slate-700/40">
      {/* Logo / Title */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-2 h-2 rounded-full bg-cyan-400" style={{ animation: 'pulse-glow 2s infinite' }} />
        <h1 className="text-sm font-bold tracking-wide text-slate-200 hidden md:block" style={{ fontFamily: 'var(--font-heading)' }}>
          JWST <span className="text-cyan-400 font-normal">Explorer</span>
        </h1>
        <span className="text-[10px] text-slate-600 hidden lg:block" style={{ fontFamily: 'var(--font-mono)' }}>
          v2.0
        </span>
      </div>

      {/* Search Bar — center */}
      <div className="relative flex-1 max-w-xl mx-4" ref={searchContainerRef}>
        <form onSubmit={onSearchSubmit} className="relative flex items-center">
          <div className="absolute left-3 text-slate-500">
            <IconSearch size={15} />
          </div>
          <input 
            type="text" 
            className="input-hud w-full pl-9 pr-20 py-2 rounded-lg text-xs"
            placeholder="Search targets... (M101, Orion, Carina...)" 
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => { if (searchQuery.trim().length > 0) setShowSuggestions(true); }}
            aria-label="Search celestial targets"
            aria-autocomplete="list"
          />
          <button 
            type="submit" 
            className="absolute right-1 top-1 bottom-1 px-4 bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-400 hover:text-cyan-300 transition-all duration-200 text-[10px] font-bold tracking-wider rounded-md cursor-pointer"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            SCAN
          </button>
        </form>

        {showSuggestions && suggestions.length > 0 && (
          <div 
            className="absolute top-full left-0 right-0 mt-1 hud-panel rounded-lg overflow-hidden shadow-2xl"
            role="listbox"
          >
            <ul className="max-h-64 overflow-y-auto custom-scrollbar py-1">
              {suggestions.map((suggestion, idx) => (
                <li 
                  key={idx} 
                  role="option"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 hover:bg-slate-800/60 cursor-pointer text-slate-300 hover:text-cyan-300 transition-colors flex items-center gap-3 text-xs border-b border-slate-800/40 last:border-0"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  <span className="text-cyan-600 text-[10px] w-6">{String(idx + 1).padStart(2, '0')}</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Status indicators — right */}
      <div className="flex items-center gap-3 shrink-0" style={{ fontFamily: 'var(--font-mono)' }}>
        <div className="hidden md:flex items-center gap-1.5 text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-slate-500">ONLINE</span>
        </div>
        <div className="hidden lg:block text-[10px] text-slate-600">
          {activeLayer.toUpperCase()}
        </div>
      </div>
    </header>
  );
};
