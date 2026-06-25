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
      {/* Cột Hologram Icons Lơ lửng */}
      <div className="flex flex-col gap-4 relative z-10">
        {hasDeepSkyData && controls.map((control, idx) => (
          <button 
            key={idx} 
            onClick={control.action} 
            className={`hologram-btn ${
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
            <button onClick={handleDownload} className="hologram-btn">
              <IconDownload size={18} />
              <span className="tooltip">Xuất dữ liệu ảnh</span>
            </button>
            <button onClick={toggleSonification} className={`hologram-btn ${isSonifying ? 'active' : ''}`}>
              <IconWave size={18} />
              <span className="tooltip">{isSonifying ? 'Đang chuyển đổi âm thanh...' : 'Âm thanh hóa quang phổ'}</span>
            </button>
            <button onClick={() => setShowSettings(!showSettings)} className={`hologram-btn ${showSettings ? 'active' : ''}`}>
              <span style={{ fontFamily: 'var(--font-mono)' }} className="text-sm font-bold">FILT</span>
              <span className="tooltip">Bộ lọc & Phân tích</span>
            </button>
          </>
        )}

        <button onClick={() => setShowQuiz(true)} className="hologram-btn text-purple-400">
          <IconTrophy size={18} />
          <span className="tooltip">Mô phỏng Huấn luyện</span>
        </button>

        {badges.length > 0 && (
          <div className="flex flex-col gap-2 mt-4">
            {badges.map((b, i) => (
              <span key={i} title={b} className="hologram-btn active !cursor-help">
                <IconTrophy size={16} />
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Advanced Settings Hologram Panel (Mở rộng ra khi click) */}
      {showSettings && hasDeepSkyData && (
        <div className="absolute left-[100%] top-1/2 -translate-y-1/2 ml-6 w-72 bg-black/80 backdrop-blur-md border-l-2 border-cyan-500 p-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] animate-[slideIn_0.3s_ease-out]">
          <h4 className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-4 border-b border-cyan-500/30 pb-2">Hologram Settings</h4>
          
          <div className="flex flex-col gap-4">
            {/* Sliders */}
            <div className="flex flex-col gap-2">
              {[
                { label: 'Brightness', key: 'brightness' as const, min: 50, max: 200 },
                { label: 'Contrast', key: 'contrast' as const, min: 50, max: 200 },
                { label: 'Saturation', key: 'saturate' as const, min: 0, max: 200 },
              ].map(slider => (
                <div key={slider.key}>
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] text-cyan-600 uppercase font-mono">{slider.label}</span>
                    <span className="text-[10px] text-cyan-400 font-mono">{filters[slider.key]}%</span>
                  </div>
                  <input 
                    type="range" 
                    min={slider.min} 
                    max={slider.max} 
                    value={filters[slider.key]} 
                    onChange={e => setFilters({...filters, [slider.key]: parseInt(e.target.value)})} 
                    className="w-full accent-cyan-500"
                  />
                </div>
              ))}
            </div>

            {/* Spectrum Panel */}
            <div className="mt-2 border-t border-cyan-500/30 pt-4">
              <SpectrumPanel spectrumMode={spectrumMode} setSpectrumMode={setSpectrumMode} timeMachineYear={timeMachineYear} setTimeMachineYear={setTimeMachineYear} />
            </div>
            
            <button onClick={generateCitizenReport} className="mt-2 w-full py-2 bg-transparent border border-cyan-500/50 text-cyan-400 font-mono text-xs uppercase hover:bg-cyan-500/20 transition-colors">
              <IconReport size={14} className="inline mr-2" /> Báo cáo Citizen Science
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
