import React from 'react';
import { SpectrumPanel } from '../SpectrumPanel';
import { SpectrumMode } from '../../data';

interface LeftHUDProps {
  activeLayer: string;
  dziUrl: string;
  filters: { brightness: number; contrast: number; saturate: number };
  setFilters: (f: { brightness: number; contrast: number; saturate: number }) => void;
  handleDownload: () => void;
  isSonifying: boolean;
  toggleSonification: () => void;
  generateCitizenReport: () => void;
  spectrumMode: SpectrumMode;
  setSpectrumMode: (m: SpectrumMode) => void;
  timeMachineYear: number;
  setTimeMachineYear: (y: number) => void;
  controls: any[];
  interactionMode: string;
  isCockpitMode: boolean;
  setShowQuiz: (s: boolean) => void;
  badges: string[];
}

export const LeftHUD: React.FC<LeftHUDProps> = ({
  activeLayer, dziUrl, filters, setFilters, handleDownload, isSonifying, toggleSonification, generateCitizenReport,
  spectrumMode, setSpectrumMode, timeMachineYear, setTimeMachineYear, controls, interactionMode, isCockpitMode, setShowQuiz, badges
}) => {
  return (
    <div className="flex flex-col gap-3 font-mono">
      {/* Quick Tools for Deep Sky */}
      {activeLayer === 'deepsky' && dziUrl && (
        <div className="flex flex-col gap-3">
          {/* Image Analysis Bento Box */}
          <div className="bg-[#0B0F19]/60 p-3 rounded-none border border-cyan-500/30 backdrop-blur shadow-[0_0_15px_rgba(6,182,212,0.1)] relative">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400"></div>
            
            <h4 className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2 border-b border-cyan-900/50 pb-2">
              <span className="w-1.5 h-1.5 bg-cyan-500 animate-pulse"></span> 
              SYS.ANALYSIS.OPTICAL
            </h4>
            
            <div className="mb-2">
              <div className="flex justify-between text-cyan-700 text-[9px] mb-1 tracking-widest"><span>BRIGHTNESS</span><span className="text-cyan-300">[{filters.brightness}%]</span></div>
              <input type="range" min="50" max="200" value={filters.brightness} onChange={e => setFilters({...filters, brightness: parseInt(e.target.value)})} className="w-full accent-cyan-500 h-[2px] bg-cyan-950 appearance-none" />
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-cyan-700 text-[9px] mb-1 tracking-widest"><span>CONTRAST</span><span className="text-cyan-300">[{filters.contrast}%]</span></div>
              <input type="range" min="50" max="200" value={filters.contrast} onChange={e => setFilters({...filters, contrast: parseInt(e.target.value)})} className="w-full accent-cyan-500 h-[2px] bg-cyan-950 appearance-none" />
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-cyan-700 text-[9px] mb-1 tracking-widest"><span>SATURATION</span><span className="text-cyan-300">[{filters.saturate}%]</span></div>
              <input type="range" min="0" max="200" value={filters.saturate} onChange={e => setFilters({...filters, saturate: parseInt(e.target.value)})} className="w-full accent-cyan-500 h-[2px] bg-cyan-950 appearance-none" />
            </div>
            <button onClick={handleDownload} className="w-full bg-cyan-950/50 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 py-1.5 font-bold tracking-widest transition-all text-[10px] uppercase shadow-[inset_0_0_10px_rgba(6,182,212,0.2)] flex items-center justify-center gap-2">
              [ CAPTURE_DATA ]
            </button>
          </div>

          {/* Audio & Report Bento Box */}
          <div className="bg-[#0B0F19]/60 p-3 rounded-none border border-cyan-500/30 backdrop-blur shadow-[0_0_15px_rgba(6,182,212,0.1)] relative">
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-400"></div>

            <h4 className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2 border-b border-cyan-900/50 pb-2">
              <span className="w-1.5 h-1.5 bg-cyan-500"></span>
              SYS.TOOLS.SCIENCE
            </h4>
            <button onClick={toggleSonification} className={`w-full py-1.5 mb-2 font-bold transition-all flex items-center justify-center gap-2 text-[10px] border uppercase tracking-widest ${isSonifying ? 'bg-amber-900/40 border-amber-500 text-amber-400 shadow-[inset_0_0_15px_rgba(245,158,11,0.3)] animate-pulse' : 'bg-cyan-950/30 border-cyan-900 text-cyan-600 hover:bg-cyan-900/80 hover:text-cyan-300 hover:border-cyan-500/50'}`}>
              {isSonifying ? '[ AUDIO_OUT: ACTIVE ]' : '[ AUDIO_OUT: INIT ]'}
            </button>
            <button onClick={generateCitizenReport} className="w-full bg-cyan-950/30 hover:bg-cyan-900/80 text-cyan-600 hover:text-cyan-300 py-1.5 font-bold transition-all flex items-center justify-center gap-2 text-[10px] border border-cyan-900 hover:border-cyan-500/50 uppercase tracking-widest">
              [ EXPORT_REPORT ]
            </button>
          </div>

          {/* Spectrum Panel */}
          <div className="bg-[#0B0F19]/60 border border-cyan-500/30 backdrop-blur shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            <SpectrumPanel spectrumMode={spectrumMode} setSpectrumMode={setSpectrumMode} timeMachineYear={timeMachineYear} setTimeMachineYear={setTimeMachineYear} />
          </div>
        </div>
      )}

      {/* Tool Grid Bento Box */}
      {activeLayer === 'deepsky' && (
        <div className="bg-[#0B0F19]/60 p-3 rounded-none border border-cyan-500/30 backdrop-blur shadow-[0_0_15px_rgba(6,182,212,0.1)] relative">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400"></div>
            
           <h4 className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2 border-b border-cyan-900/50 pb-2">
              <span className="w-1.5 h-1.5 bg-cyan-500"></span>
              CTRL.MODULES
            </h4>
          <div className="grid grid-cols-4 gap-2">
            {controls.map((control, idx) => (
              <button key={idx} onClick={control.action} title={control.title} className={`aspect-square border flex items-center justify-center text-xl transition-all duration-300 hover:scale-105 ${['mark', 'select', 'measure', 'magnify', 'blackhole', 'cockpit'].includes(control.type) && (interactionMode === control.type || (control.type === 'cockpit' && isCockpitMode)) ? 'bg-cyan-600/40 border-cyan-400 text-cyan-100 shadow-[inset_0_0_15px_rgba(34,211,238,0.5)]' : 'bg-cyan-950/30 border-cyan-900 text-cyan-700 hover:bg-cyan-900/80 hover:text-cyan-300 hover:border-cyan-500/50'}`}>
                {control.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quiz Button */}
      <button onClick={() => setShowQuiz(true)} className="w-full relative group overflow-hidden bg-[#0B0F19]/80 border border-purple-500/50 py-3 text-[10px] font-bold flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] uppercase tracking-widest">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(168,85,247,0.2),transparent)] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        <span className="w-1.5 h-1.5 bg-purple-500 group-hover:animate-ping"></span>
        <span className="relative z-10 text-purple-400 group-hover:text-purple-200 transition-colors">INITIATE.TRAINING.SIM</span>
      </button>
      
      {/* Badge display */}
      {badges.length > 0 && (
        <div className="bg-[#0B0F19]/60 p-3 border border-cyan-500/30 flex flex-wrap gap-2 justify-center backdrop-blur relative">
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400"></div>
          {badges.map((b, i) => <span key={i} title={b} className="text-2xl drop-shadow-[0_0_10px_rgba(34,211,238,0.6)] hover:scale-110 transition-transform cursor-help">🎖️</span>)}
        </div>
      )}
    </div>
  );
};
