import React from 'react';
import { IconGallery, IconRadar, IconStar, IconTelescope, IconPanel } from '../Icons';

export const BottomDock: React.FC<any> = ({ items }) => {
  return (
    <div className="flex justify-center mt-6 z-50">
      <div className="border border-[var(--ks-gold-hairline)] rounded-sm bg-[var(--ks-lacquer-deep)] flex items-center px-8 py-3 gap-8 shadow-[0_0_20px_rgba(212,175,55,0.05)] relative">
        <div className="flex flex-col items-center gap-2 cursor-pointer group">
          <IconGallery size={20} className="text-[var(--ks-text-muted)] group-hover:text-[var(--ks-champagne)] transition-colors" />
          <span className="text-[10px] text-[var(--ks-text-muted)] group-hover:text-[var(--ks-champagne)] transition-colors" style={{fontFamily: 'var(--font-mono)'}}>Deep Field</span>
        </div>
        <div className="w-px h-8 bg-[var(--ks-gold-hairline)] opacity-30"></div>
        <div className="flex flex-col items-center gap-2 cursor-pointer group">
          <IconRadar size={20} className="text-[var(--ks-text-muted)] group-hover:text-[var(--ks-champagne)] transition-colors" />
          <span className="text-[10px] text-[var(--ks-text-muted)] group-hover:text-[var(--ks-champagne)] transition-colors" style={{fontFamily: 'var(--font-mono)'}}>Exoplanets</span>
        </div>
        <div className="w-px h-8 bg-[var(--ks-gold-hairline)] opacity-30"></div>
        <div className="flex flex-col items-center gap-2 cursor-pointer group">
          <IconTelescope size={20} className="text-[var(--ks-text-muted)] group-hover:text-[var(--ks-champagne)] transition-colors" />
          <span className="text-[10px] text-[var(--ks-text-muted)] group-hover:text-[var(--ks-champagne)] transition-colors" style={{fontFamily: 'var(--font-mono)'}}>Sky Survey</span>
        </div>
        <div className="w-px h-8 bg-[var(--ks-gold-hairline)] opacity-30"></div>
        <div className="flex flex-col items-center gap-2 cursor-pointer group">
          <IconStar size={20} className="text-[var(--ks-text-muted)] group-hover:text-[var(--ks-champagne)] transition-colors" />
          <span className="text-[10px] text-[var(--ks-text-muted)] group-hover:text-[var(--ks-champagne)] transition-colors" style={{fontFamily: 'var(--font-mono)'}}>Galactics</span>
        </div>
        <div className="w-px h-8 bg-[var(--ks-gold-hairline)] opacity-30"></div>
        <div className="flex flex-col items-center gap-2 cursor-pointer group">
          <IconPanel size={20} className="text-[var(--ks-text-muted)] group-hover:text-[var(--ks-champagne)] transition-colors" />
          <span className="text-[10px] text-[var(--ks-text-muted)] group-hover:text-[var(--ks-champagne)] transition-colors" style={{fontFamily: 'var(--font-mono)'}}>Archive</span>
        </div>
        
        {/* Aesthetic brackets below */}
        <div className="absolute -bottom-4 left-0 w-2 h-2 border-b border-l border-[var(--ks-gold-hairline)] opacity-50"></div>
        <div className="absolute -bottom-4 right-0 w-2 h-2 border-b border-r border-[var(--ks-gold-hairline)] opacity-50"></div>
        <div className="absolute -bottom-4 left-4 right-4 h-px bg-[var(--ks-gold-hairline)] opacity-20"></div>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-[var(--ks-kinpaku-gold)] font-mono tracking-widest opacity-80">
          Bottom Dock
        </div>
      </div>
    </div>
  );
};
