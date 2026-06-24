import React from 'react';
import { SpectrumMode } from '../data';

interface SpectrumPanelProps {
  spectrumMode: SpectrumMode;
  setSpectrumMode: (val: SpectrumMode) => void;
  timeMachineYear: number;
  setTimeMachineYear: (val: number) => void;
}

export const SpectrumPanel: React.FC<SpectrumPanelProps> = ({ spectrumMode, setSpectrumMode, timeMachineYear, setTimeMachineYear }) => (
  <div className="w-full relative">
    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400"></div>
    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-400"></div>

    <div className="p-3">
      <h3 className="text-[10px] font-bold text-cyan-400 mb-3 uppercase tracking-[0.2em] border-b border-cyan-900/50 pb-2 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-cyan-500"></span>
        SYS.FILTER.SPECTRUM
      </h3>
      <div className="flex flex-col gap-1.5 mb-4">
        <button onClick={() => setSpectrumMode('NIRCAM')} className={`py-1.5 px-3 rounded-none text-[10px] font-bold tracking-widest transition-all uppercase border ${spectrumMode==='NIRCAM' ? 'bg-cyan-600/40 text-cyan-100 border-cyan-400 shadow-[inset_0_0_10px_rgba(34,211,238,0.3)]' : 'bg-cyan-950/30 text-cyan-700 border-cyan-900 hover:text-cyan-300 hover:border-cyan-500/50'}`}>[ OPTICAL ] HUBBLE</button>
        <button onClick={() => setSpectrumMode('MIRI')} className={`py-1.5 px-3 rounded-none text-[10px] font-bold tracking-widest transition-all uppercase border ${spectrumMode==='MIRI' ? 'bg-amber-600/40 text-amber-100 border-amber-400 shadow-[inset_0_0_10px_rgba(251,191,36,0.3)]' : 'bg-cyan-950/30 text-cyan-700 border-cyan-900 hover:text-amber-500/70 hover:border-amber-500/50'}`}>[ INFRARED ] MIRI</button>
        <button onClick={() => setSpectrumMode('XRAY')} className={`py-1.5 px-3 rounded-none text-[10px] font-bold tracking-widest transition-all uppercase border ${spectrumMode==='XRAY' ? 'bg-purple-600/40 text-purple-100 border-purple-400 shadow-[inset_0_0_10px_rgba(168,85,247,0.3)]' : 'bg-cyan-950/30 text-cyan-700 border-cyan-900 hover:text-purple-400/70 hover:border-purple-500/50'}`}>[ X-RAY ] CHANDRA</button>
      </div>

      <h3 className="text-[10px] font-bold text-cyan-400 mb-3 uppercase tracking-[0.2em] border-b border-cyan-900/50 pb-2 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-cyan-500"></span>
        SYS.TIME.MACHINE
      </h3>
      <div className="flex flex-col gap-1 px-1">
        <div className="flex justify-between text-cyan-700 text-[9px] mb-1 tracking-widest font-bold">
          <span className={timeMachineYear <= 2005 ? "text-amber-400" : ""}>1990</span>
          <span className={timeMachineYear >= 2020 ? "text-cyan-300" : ""}>2026</span>
        </div>
        <input 
          type="range" min="1990" max="2026" value={timeMachineYear} 
          onChange={e => setTimeMachineYear(parseInt(e.target.value))} 
          className="w-full accent-cyan-500 h-[2px] bg-cyan-950 appearance-none" 
        />
        <div className="text-center text-[9px] text-cyan-700 mt-1 tracking-widest">YEAR: <span className="text-cyan-300 font-bold">{timeMachineYear}</span></div>
      </div>
    </div>
  </div>
);
