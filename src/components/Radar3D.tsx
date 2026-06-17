import React from 'react';

export const Radar3D: React.FC = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
      <div className="w-96 h-96 rounded-full border border-emerald-500/50 relative bg-black/80 shadow-[0_0_100px_rgba(16,185,129,0.3)] backdrop-blur-md overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-emerald-500/30 scale-75"></div>
        <div className="absolute inset-0 rounded-full border border-emerald-500/20 scale-50"></div>
        <div className="absolute w-full h-[1px] bg-emerald-500/40"></div>
        <div className="absolute h-full w-[1px] bg-emerald-500/40"></div>
        <div className="absolute top-1/2 left-1/2 w-1/2 h-1 bg-gradient-to-r from-emerald-400/0 to-emerald-400/80 origin-left animate-[spin_4s_linear_infinite]"></div>
        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_15px_blue] -translate-x-1/2 -translate-y-1/2" title="Trái Đất"></div>
        <div className="absolute top-1/4 left-3/4 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_15px_red] animate-ping" title="Mục tiêu JWST"></div>
        <div className="absolute bottom-4 text-emerald-400 font-mono text-xs text-center w-full">ĐỊNH VỊ SAO TOÀN CẢNH<br/>Vĩ độ: 45.2° | Kinh độ: 12.8°</div>
      </div>
    </div>
  );
};
