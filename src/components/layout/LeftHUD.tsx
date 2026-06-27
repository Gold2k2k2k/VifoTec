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
    <div className="flex relative">
      {/* Floating Toolbar */}
      <div className="flex flex-col gap-2 relative z-10 glass-pill p-2 border-white/5">
        {hasDeepSkyData && controls.map((control, idx) => (
          <button 
            key={idx} 
            onClick={control.action} 
            className={`glass-btn w-10 h-10 p-0 rounded-full ${
              ['mark', 'select', 'measure', 'magnify', 'blackhole', 'cockpit'].includes(control.type) && 
              (interactionMode === control.type || (control.type === 'cockpit' && isCockpitMode)) 
                ? 'active' : ''
            }`}
          >
            {control.icon}
            <span className="tooltip">{control.title}</span>
          </button>
        ))}

        {hasDeepSkyData && (
          <>
            <div className="w-6 h-px bg-white/10 mx-auto my-1"></div>
            <button onClick={handleDownload} className="glass-btn w-10 h-10 p-0 rounded-full">
              <IconDownload size={16} />
              <span className="tooltip">Xuất dữ liệu ảnh</span>
            </button>
            <button onClick={toggleSonification} className={`glass-btn w-10 h-10 p-0 rounded-full ${isSonifying ? 'active' : ''}`}>
              <IconWave size={16} />
              <span className="tooltip">{isSonifying ? 'Đang chuyển đổi âm thanh...' : 'Âm thanh hóa quang phổ'}</span>
            </button>
            <button onClick={() => setShowSettings(!showSettings)} className={`glass-btn w-10 h-10 p-0 rounded-full ${showSettings ? 'active' : ''}`}>
              <span style={{ fontFamily: 'var(--font-mono)' }} className="text-[9px] font-medium tracking-widest">FILT</span>
              <span className="tooltip">Bộ lọc & Phân tích</span>
            </button>
          </>
        )}

        <div className="w-6 h-px bg-white/10 mx-auto my-1"></div>
        <button onClick={() => setShowQuiz(true)} className="glass-btn w-10 h-10 p-0 rounded-full text-white/70 hover:text-white">
          <IconTrophy size={16} />
          <span className="tooltip">Mô phỏng Huấn luyện</span>
        </button>

        {badges.length > 0 && (
          <div className="flex flex-col gap-2 mt-2 items-center">
            {badges.map((b, i) => (
              <span key={i} title={b} className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shadow-lg cursor-help">
                <IconTrophy size={14} className="text-white/90" />
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Advanced Settings Hologram Panel */}
      {showSettings && hasDeepSkyData && (
        <div className="absolute left-[100%] top-1/2 -translate-y-1/2 ml-6 w-80 glass-panel p-6 shadow-2xl border-white/5 transition-opacity duration-300 opacity-100">
          <h4 className="text-white/60 font-mono text-[10px] uppercase tracking-[0.2em] mb-6 border-b border-white/5 pb-3">Settings & Analysis</h4>
          
          <div className="flex flex-col gap-6">
            {/* Sliders */}
            <div className="flex flex-col gap-4">
              {[
                { label: 'Brightness', key: 'brightness' as const, min: 50, max: 200 },
                { label: 'Contrast', key: 'contrast' as const, min: 50, max: 200 },
                { label: 'Saturation', key: 'saturate' as const, min: 0, max: 200 },
              ].map(slider => (
                <div key={slider.key}>
                  <div className="flex justify-between mb-2">
                    <span className="text-[10px] text-white/40 uppercase font-mono tracking-widest">{slider.label}</span>
                    <span className="text-[10px] text-white/80 font-mono">{filters[slider.key]}%</span>
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

            {/* Spectrum Panel */}
            <div className="mt-2 border-t border-white/5 pt-6">
              <SpectrumPanel spectrumMode={spectrumMode} setSpectrumMode={setSpectrumMode} timeMachineYear={timeMachineYear} setTimeMachineYear={setTimeMachineYear} />
            </div>
            
            <button onClick={generateCitizenReport} className="mt-4 w-full py-3 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white font-mono text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all duration-300 border border-white/5">
              <IconReport size={14} className="inline mr-2" /> Báo cáo Citizen Science
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
