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
    <div className="flex flex-col gap-4">
      {/* Quick Tools for Deep Sky */}
      {activeLayer === 'deepsky' && dziUrl && (
        <div className="flex flex-col gap-3">
          {/* Image Analysis Bento Box */}
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/50 backdrop-blur shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span> 
              Phân Tích Hình Ảnh
            </h4>
            
            <div className="mb-3">
              <div className="flex justify-between text-slate-300 text-xs mb-1 font-mono"><span>Độ sáng</span><span className="text-sky-400">{filters.brightness}%</span></div>
              <input type="range" min="50" max="200" value={filters.brightness} onChange={e => setFilters({...filters, brightness: parseInt(e.target.value)})} className="w-full accent-sky-500 h-1 bg-slate-800 rounded-full appearance-none" />
            </div>
            <div className="mb-3">
              <div className="flex justify-between text-slate-300 text-xs mb-1 font-mono"><span>Tương phản</span><span className="text-sky-400">{filters.contrast}%</span></div>
              <input type="range" min="50" max="200" value={filters.contrast} onChange={e => setFilters({...filters, contrast: parseInt(e.target.value)})} className="w-full accent-sky-500 h-1 bg-slate-800 rounded-full appearance-none" />
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-slate-300 text-xs mb-1 font-mono"><span>Độ bão hòa</span><span className="text-sky-400">{filters.saturate}%</span></div>
              <input type="range" min="0" max="200" value={filters.saturate} onChange={e => setFilters({...filters, saturate: parseInt(e.target.value)})} className="w-full accent-sky-500 h-1 bg-slate-800 rounded-full appearance-none" />
            </div>
            <button onClick={handleDownload} className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)]">
              📸 Chụp ảnh (HD)
            </button>
          </div>

          {/* Audio & Report Bento Box */}
          <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/50 backdrop-blur shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <h4 className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              Công Cụ Khoa Học
            </h4>
            <button onClick={toggleSonification} className={`w-full py-2 mb-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm border ${isSonifying ? 'bg-orange-600/20 border-orange-400 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.3)] animate-pulse' : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
              🎵 {isSonifying ? 'Đang Phát Âm Thanh Phổ...' : 'Phát Âm Thanh Phổ'}
            </button>
            <button onClick={generateCitizenReport} className="w-full bg-slate-800/80 hover:bg-slate-700 text-slate-200 py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm border border-slate-700 hover:border-slate-500">
              🖨️ Xuất Báo Cáo Khoa Học
            </button>
          </div>

          {/* Spectrum Panel */}
          <div className="bg-slate-900/60 rounded-2xl border border-slate-700/50 overflow-hidden backdrop-blur shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
            <SpectrumPanel spectrumMode={spectrumMode} setSpectrumMode={setSpectrumMode} timeMachineYear={timeMachineYear} setTimeMachineYear={setTimeMachineYear} />
          </div>
        </div>
      )}

      {/* Tool Grid Bento Box */}
      {activeLayer === 'deepsky' && (
        <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/50 backdrop-blur shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
           <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              Tương Tác Nâng Cao
            </h4>
          <div className="grid grid-cols-4 gap-3">
            {controls.map((control, idx) => (
              <button key={idx} onClick={control.action} title={control.title} className={`aspect-square rounded-xl shadow-lg border flex items-center justify-center text-2xl transition-all duration-300 hover:scale-105 ${['mark', 'select', 'measure', 'magnify', 'blackhole', 'cockpit'].includes(control.type) && (interactionMode === control.type || (control.type === 'cockpit' && isCockpitMode)) ? 'bg-indigo-600 border-indigo-400 text-white shadow-[0_0_15px_rgba(79,70,229,0.6)]' : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'}`}>
                {control.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quiz Button */}
      <button onClick={() => setShowQuiz(true)} className="w-full relative group overflow-hidden bg-slate-900/80 border border-purple-500/50 py-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 group-hover:from-purple-600/40 group-hover:to-fuchsia-600/40 transition-colors"></div>
        <span className="relative z-10 text-purple-200 group-hover:text-white transition-colors">🎮 Trắc Nghiệm Kiến Thức</span>
      </button>
      
      {/* Badge display */}
      {badges.length > 0 && (
        <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/50 flex flex-wrap gap-3 justify-center backdrop-blur">
          {badges.map((b, i) => <span key={i} title={b} className="text-3xl drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] hover:scale-110 transition-transform cursor-help">🎖️</span>)}
        </div>
      )}
    </div>
  );
};
