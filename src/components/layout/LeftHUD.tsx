import React, { useState } from 'react';
import { SpectrumPanel } from '../SpectrumPanel';
import { IconDownload, IconWave, IconReport, IconTrophy } from '../Icons';
import { useViewer } from '../../context/ViewerContext';

interface LeftHUDProps {
  activeLayer: string;
  dziUrl: string;
  filters: { brightness: number; contrast: number; saturate: number };
  setFilters: (f: { brightness: number; contrast: number; saturate: number }) => void;
  handleDownload: () => void;
  toggleSonification: () => void;
  generateCitizenReport: () => void;
  controls: any[];
  isCockpitMode: boolean;
  setShowQuiz: (s: boolean) => void;
  badges: string[];
}

export const LeftHUD: React.FC<LeftHUDProps> = ({
  activeLayer, dziUrl, filters, setFilters, handleDownload, toggleSonification, generateCitizenReport,
  controls, isCockpitMode, setShowQuiz, badges
}) => {
  const { isSonifying, spectrumMode, setSpectrumMode, timeMachineYear, setTimeMachineYear, interactionMode } = useViewer();
  const [showSettings, setShowSettings] = useState(false);

  const hasDeepSkyData = activeLayer === 'deepsky' && dziUrl;

  return (
    <div className="absolute left-0 top-16 bottom-16 flex z-[70] pointer-events-none">
      {/* Full-height sleek rail */}
      <div className="w-16 bg-black/20 backdrop-blur-xl border-r border-white/5 flex flex-col items-center py-6 gap-4 pointer-events-auto h-full overflow-y-auto hide-scrollbar">
        {hasDeepSkyData && controls.map((control, idx) => (
          <button 
            key={idx} 
            onClick={control.action} 
            className={`w-12 h-12 flex items-center justify-center rounded-xl cursor-pointer transition-all duration-300 border ${
              ['mark', 'select', 'measure', 'magnify', 'blackhole', 'cockpit'].includes(control.type) && 
              (interactionMode === control.type || (control.type === 'cockpit' && isCockpitMode)) 
                ? 'bg-white/15 text-white border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]' 
                : 'bg-transparent text-white/50 border-transparent hover:bg-white/5 hover:text-white/90'
            }`}
            title={control.title}
          >
            {control.icon}
          </button>
        ))}

        {hasDeepSkyData && (
          <>
            <div className="w-8 h-px bg-white/10 my-2 shrink-0"></div>
            <button onClick={handleDownload} className="w-12 h-12 flex items-center justify-center rounded-xl cursor-pointer bg-transparent text-white/50 border border-transparent hover:bg-white/5 hover:text-white/90 transition-all duration-300" title="Xuất dữ liệu ảnh">
              <IconDownload size={20} />
            </button>
            <button onClick={toggleSonification} className={`w-12 h-12 flex items-center justify-center rounded-xl cursor-pointer transition-all duration-300 border ${isSonifying ? 'bg-white/15 text-white border-white/20' : 'bg-transparent text-white/50 border-transparent hover:bg-white/5 hover:text-white/90'}`} title="Âm thanh hóa quang phổ">
              <IconWave size={20} />
            </button>
            <button onClick={() => setShowSettings(!showSettings)} className={`w-12 h-12 flex items-center justify-center rounded-xl cursor-pointer transition-all duration-300 border ${showSettings ? 'bg-white/15 text-white border-white/20' : 'bg-transparent text-white/50 border-transparent hover:bg-white/5 hover:text-white/90'}`} title="Bộ lọc & Phân tích">
              <span style={{ fontFamily: 'var(--font-mono)' }} className="text-[10px] font-medium tracking-widest uppercase">Filt</span>
            </button>
          </>
        )}

        <div className="w-8 h-px bg-white/10 my-2 shrink-0"></div>
        <button onClick={() => setShowQuiz(true)} className="w-12 h-12 flex items-center justify-center rounded-xl cursor-pointer bg-transparent text-white/50 border border-transparent hover:bg-white/5 hover:text-white/90 transition-all duration-300" title="Mô phỏng Huấn luyện">
          <IconTrophy size={20} />
        </button>

        {badges.length > 0 && (
          <div className="flex flex-col gap-3 mt-4 items-center shrink-0">
            {badges.map((b, i) => (
              <span key={i} title={b} className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shadow-lg cursor-help">
                <IconTrophy size={16} className="text-white/90" />
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Advanced Settings PC Panel */}
      {showSettings && hasDeepSkyData && (
        <div className="w-[350px] bg-black/40 backdrop-blur-3xl border-r border-white/10 p-8 pointer-events-auto h-full overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-left-4 duration-300">
          <h4 className="text-white/60 font-mono text-xs uppercase tracking-[0.2em] mb-8 border-b border-white/10 pb-4">Settings & Analysis</h4>
          
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              {[
                { label: 'Brightness', key: 'brightness' as const, min: 50, max: 200 },
                { label: 'Contrast', key: 'contrast' as const, min: 50, max: 200 },
                { label: 'Saturation', key: 'saturate' as const, min: 0, max: 200 },
              ].map(slider => (
                <div key={slider.key}>
                  <div className="flex justify-between mb-3">
                    <span className="text-xs text-white/40 uppercase font-mono tracking-widest">{slider.label}</span>
                    <span className="text-xs text-white/80 font-mono">{filters[slider.key]}%</span>
                  </div>
                  <input 
                    type="range" 
                    min={slider.min} 
                    max={slider.max} 
                    value={filters[slider.key]} 
                    onChange={e => setFilters({...filters, [slider.key]: parseInt(e.target.value)})} 
                    className="w-full"
                  />
                </div>
              ))}
            </div>

            <div className="mt-4 border-t border-white/10 pt-8">
              <SpectrumPanel spectrumMode={spectrumMode} setSpectrumMode={setSpectrumMode} timeMachineYear={timeMachineYear} setTimeMachineYear={setTimeMachineYear} />
            </div>
            
            <button onClick={generateCitizenReport} className="mt-6 w-full py-4 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white font-mono text-xs uppercase tracking-[0.2em] rounded-lg transition-all duration-300 border border-white/10 flex items-center justify-center gap-3 cursor-pointer">
              <IconReport size={16} /> Báo cáo Khoa Học
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
