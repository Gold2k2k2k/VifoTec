import React from 'react';
import { SpectrumMode } from '../data';

interface SpectrumPanelProps {
  spectrumMode: SpectrumMode;
  setSpectrumMode: (val: SpectrumMode) => void;
}

export const SpectrumPanel: React.FC<SpectrumPanelProps> = ({ spectrumMode, setSpectrumMode }) => (
  <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md border border-slate-700 p-4 rounded-xl shadow-2xl z-20 w-56 pointer-events-auto">
    <h3 className="font-bold text-emerald-400 mb-3 uppercase tracking-wider text-xs border-b border-slate-700 pb-2">Kính Lọc Đa Phổ</h3>
    <div className="flex flex-col gap-2">
      <button onClick={() => setSpectrumMode('NIRCAM')} className={`py-1.5 px-3 rounded text-sm font-semibold transition-all ${spectrumMode==='NIRCAM' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>📷 Khả kiến (Hubble)</button>
      <button onClick={() => setSpectrumMode('MIRI')} className={`py-1.5 px-3 rounded text-sm font-semibold transition-all ${spectrumMode==='MIRI' ? 'bg-orange-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>🔥 Hồng ngoại (MIRI)</button>
      <button onClick={() => setSpectrumMode('XRAY')} className={`py-1.5 px-3 rounded text-sm font-semibold transition-all ${spectrumMode==='XRAY' ? 'bg-purple-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>☢️ Tia X (Chandra)</button>
    </div>
  </div>
);
