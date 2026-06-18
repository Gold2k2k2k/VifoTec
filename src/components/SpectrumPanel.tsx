import React from 'react';
import { SpectrumMode } from '../data';

interface SpectrumPanelProps {
  spectrumMode: SpectrumMode;
  setSpectrumMode: (val: SpectrumMode) => void;
  timeMachineYear: number;
  setTimeMachineYear: (val: number) => void;
}

export const SpectrumPanel: React.FC<SpectrumPanelProps> = ({ spectrumMode, setSpectrumMode, timeMachineYear, setTimeMachineYear }) => (
  <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-2xl z-20 w-64 pointer-events-auto">
    <h3 className="font-bold text-emerald-400 mb-3 uppercase tracking-wider text-xs border-b border-slate-700 pb-2">Kính Lọc Đa Phổ</h3>
    <div className="flex flex-col gap-2 mb-4">
      <button onClick={() => setSpectrumMode('NIRCAM')} className={`py-1.5 px-3 rounded text-sm font-semibold transition-all ${spectrumMode==='NIRCAM' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>📷 Khả kiến (Hubble)</button>
      <button onClick={() => setSpectrumMode('MIRI')} className={`py-1.5 px-3 rounded text-sm font-semibold transition-all ${spectrumMode==='MIRI' ? 'bg-orange-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>🔥 Hồng ngoại (MIRI)</button>
      <button onClick={() => setSpectrumMode('XRAY')} className={`py-1.5 px-3 rounded text-sm font-semibold transition-all ${spectrumMode==='XRAY' ? 'bg-purple-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>☢️ Tia X (Chandra)</button>
    </div>

    <h3 className="font-bold text-blue-400 mb-3 uppercase tracking-wider text-xs border-b border-slate-700 pb-2">⏳ Cỗ máy thời gian</h3>
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-slate-300 text-xs mb-1 font-bold">
        <span className={timeMachineYear <= 2005 ? "text-yellow-400" : ""}>Hubble (1990)</span>
        <span className={timeMachineYear >= 2020 ? "text-blue-400" : ""}>JWST (2026)</span>
      </div>
      <input 
        type="range" min="1990" max="2026" value={timeMachineYear} 
        onChange={e => setTimeMachineYear(parseInt(e.target.value))} 
        className="w-full accent-blue-500" 
      />
      <div className="text-center text-xs text-slate-400 mt-1">Năm quan sát: <span className="text-white font-bold">{timeMachineYear}</span></div>
    </div>
  </div>
);
