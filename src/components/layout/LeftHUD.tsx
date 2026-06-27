import React, { useState } from 'react';
import { IconDownload, IconWave, IconReport, IconTrophy } from '../Icons';

export const LeftHUD: React.FC<any> = ({ controls, handleDownload, toggleSonification, generateCitizenReport, setShowQuiz }) => {
  return (
    <div className="absolute left-0 top-16 bottom-0 w-16 bg-[var(--ks-graphite)] border-r border-[var(--ks-gold-hairline)] flex flex-col items-center py-6 gap-4 z-[90]">
      {controls && controls.map((c: any, i: number) => (
        <button 
          key={i} 
          onClick={c.action} 
          className="w-10 h-10 flex items-center justify-center rounded-[2px] transition-all duration-200 hover:bg-[var(--ks-kinpaku-pale)] hover:text-[var(--ks-lacquer-deep)] text-[var(--ks-kinpaku-gold)] border border-[var(--ks-gold-hairline)] bg-[var(--ks-lacquer-deep)]"
          title={c.title}
        >
          {c.icon || <span style={{fontFamily: 'var(--font-mono)', fontSize: '10px'}}>{c.title.substring(0,2)}</span>}
        </button>
      ))}
      <div className="w-8 h-px bg-[var(--ks-gold-hairline)] my-2"></div>
      <button onClick={handleDownload} className="w-10 h-10 flex items-center justify-center rounded-[2px] hover:bg-[var(--ks-patina-pale)] hover:text-[var(--ks-lacquer-deep)] text-[var(--ks-verdigris-patina)] border border-[var(--ks-gold-hairline)] bg-[var(--ks-lacquer-deep)] transition-all duration-200">
        <IconDownload size={18} />
      </button>
      <button onClick={toggleSonification} className="w-10 h-10 flex items-center justify-center rounded-[2px] hover:bg-[var(--ks-patina-pale)] hover:text-[var(--ks-lacquer-deep)] text-[var(--ks-verdigris-patina)] border border-[var(--ks-gold-hairline)] bg-[var(--ks-lacquer-deep)] transition-all duration-200">
        <IconWave size={18} />
      </button>
      <button onClick={generateCitizenReport} className="w-10 h-10 flex items-center justify-center rounded-[2px] hover:bg-[var(--ks-patina-pale)] hover:text-[var(--ks-lacquer-deep)] text-[var(--ks-verdigris-patina)] border border-[var(--ks-gold-hairline)] bg-[var(--ks-lacquer-deep)] transition-all duration-200">
        <IconReport size={18} />
      </button>
      <div className="w-8 h-px bg-[var(--ks-gold-hairline)] my-2"></div>
      <button onClick={() => setShowQuiz(true)} className="w-10 h-10 flex items-center justify-center rounded-[2px] hover:bg-[var(--ks-kinpaku-pale)] hover:text-[var(--ks-lacquer-deep)] text-[var(--ks-kinpaku-gold)] border border-[var(--ks-gold-hairline)] bg-[var(--ks-lacquer-deep)] transition-all duration-200">
        <IconTrophy size={18} />
      </button>
    </div>
  );
};
