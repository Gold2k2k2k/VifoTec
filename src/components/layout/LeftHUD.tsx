import React, { useState } from 'react';
import { SpectrumPanel } from '../SpectrumPanel';
import { SpectrumMode } from '../../data';
import { IconDownload, IconWave, IconReport, IconTrophy } from '../Icons';

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

type TabType = 'IMAGE' | 'ANALYSIS' | 'TOOLS';

export const LeftHUD: React.FC<LeftHUDProps> = ({
  activeLayer, dziUrl, filters, setFilters, handleDownload, isSonifying, toggleSonification, generateCitizenReport,
  spectrumMode, setSpectrumMode, timeMachineYear, setTimeMachineYear, controls, interactionMode, isCockpitMode, setShowQuiz, badges
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('IMAGE');

  const hasDeepSkyData = activeLayer === 'deepsky' && dziUrl;

  return (
    <div className="flex flex-col gap-2">
      {/* Tab Navigation */}
      {hasDeepSkyData && (
        <div className="flex bg-slate-900/50 rounded-lg p-0.5 gap-0.5" role="tablist">
          {(['IMAGE', 'ANALYSIS', 'TOOLS'] as TabType[]).map(tab => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-1.5 text-[10px] font-semibold tracking-wider rounded-md cursor-pointer transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-cyan-500/15 text-cyan-300 shadow-[0_0_8px_rgba(0,255,255,0.1)]'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/40'
              }`}
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {/* IMAGE Tab */}
      {hasDeepSkyData && activeTab === 'IMAGE' && (
        <div className="flex flex-col gap-3 p-3 bg-slate-900/30 rounded-lg border border-slate-700/30">
          <h4 className="hud-label text-cyan-400 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-cyan-400" />
            Optical Analysis
          </h4>
          
          {[
            { label: 'Brightness', key: 'brightness' as const, min: 50, max: 200 },
            { label: 'Contrast', key: 'contrast' as const, min: 50, max: 200 },
            { label: 'Saturation', key: 'saturate' as const, min: 0, max: 200 },
          ].map(slider => (
            <div key={slider.key}>
              <div className="flex justify-between mb-1">
                <span className="hud-label">{slider.label}</span>
                <span className="text-[10px] text-cyan-400" style={{ fontFamily: 'var(--font-mono)' }}>{filters[slider.key]}%</span>
              </div>
              <input 
                type="range" 
                min={slider.min} 
                max={slider.max} 
                value={filters[slider.key]} 
                onChange={e => setFilters({...filters, [slider.key]: parseInt(e.target.value)})} 
                className="w-full"
                aria-label={slider.label}
              />
            </div>
          ))}

          <button onClick={handleDownload} className="btn-primary flex items-center justify-center gap-2 w-full mt-1">
            <IconDownload size={14} />
            Capture Image
          </button>
        </div>
      )}

      {/* ANALYSIS Tab */}
      {hasDeepSkyData && activeTab === 'ANALYSIS' && (
        <div className="flex flex-col gap-3">
          <div className="p-3 bg-slate-900/30 rounded-lg border border-slate-700/30">
            <h4 className="hud-label text-cyan-400 flex items-center gap-2 mb-3">
              <span className="w-1 h-1 rounded-full bg-cyan-400" />
              Science Tools
            </h4>
            <div className="flex flex-col gap-2">
              <button 
                onClick={toggleSonification} 
                className={`btn-primary flex items-center justify-center gap-2 w-full ${isSonifying ? '!bg-amber-500/20 !border-amber-500/50 !text-amber-300' : ''}`}
              >
                <IconWave size={14} />
                {isSonifying ? 'Sonification Active' : 'Start Sonification'}
              </button>
              <button onClick={generateCitizenReport} className="btn-ghost flex items-center justify-center gap-2 w-full">
                <IconReport size={14} />
                Export Report
              </button>
            </div>
          </div>

          <div className="bg-slate-900/30 rounded-lg border border-slate-700/30 overflow-hidden">
            <SpectrumPanel spectrumMode={spectrumMode} setSpectrumMode={setSpectrumMode} timeMachineYear={timeMachineYear} setTimeMachineYear={setTimeMachineYear} />
          </div>
        </div>
      )}

      {/* TOOLS Tab */}
      {hasDeepSkyData && activeTab === 'TOOLS' && (
        <div className="p-3 bg-slate-900/30 rounded-lg border border-slate-700/30">
          <h4 className="hud-label text-cyan-400 flex items-center gap-2 mb-3">
            <span className="w-1 h-1 rounded-full bg-cyan-400" />
            Interaction Modes
          </h4>
          <div className="grid grid-cols-3 gap-1.5">
            {controls.map((control, idx) => (
              <button 
                key={idx} 
                onClick={control.action} 
                title={control.title}
                aria-label={control.title}
                className={`btn-icon rounded-lg h-10 w-full ${
                  ['mark', 'select', 'measure', 'magnify', 'blackhole', 'cockpit'].includes(control.type) && 
                  (interactionMode === control.type || (control.type === 'cockpit' && isCockpitMode)) 
                    ? 'active' : ''
                }`}
              >
                {control.icon || control.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quiz & Badges — always visible */}
      <button 
        onClick={() => setShowQuiz(true)} 
        className="btn-ghost flex items-center justify-center gap-2 w-full border-purple-500/30 text-purple-400 hover:text-purple-300 hover:border-purple-500/50 hover:bg-purple-500/10 mt-1"
      >
        <IconTrophy size={14} />
        Training Simulation
      </button>
      
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-1.5 justify-center p-2 bg-slate-900/30 rounded-lg border border-slate-700/30">
          {badges.map((b, i) => (
            <span key={i} title={b} className="w-8 h-8 flex items-center justify-center bg-cyan-500/10 border border-cyan-500/20 rounded-lg cursor-help transition-transform hover:scale-110">
              <IconTrophy size={16} className="text-cyan-400" />
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
