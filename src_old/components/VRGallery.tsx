import React, { useState, useEffect } from 'react';
import { POPULAR_TARGETS } from '../data';

export const VRGallery: React.FC<{ onClose: () => void, speakText: (txt: string) => void }> = ({ onClose, speakText }) => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    speakText("Chào mừng đến phòng trưng bày thực tế ảo không gian. Sử dụng chuột để xoay góc nhìn và ngắm nhìn các kỳ quan của vũ trụ.");
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) { // Left click drag
      setRotation(prev => prev + e.movementX * 0.5);
    }
  };

  const targets = POPULAR_TARGETS.slice(0, 8); // Octagon (8 faces)

  return (
    <div className="fixed inset-0 z-[100] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-black to-black perspective-[1200px] overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing"
         onMouseMove={handleMouseMove}>
      
      {/* HUD */}
      <div className="absolute top-8 right-8 z-50 flex gap-4">
        <button onClick={onClose} className="px-6 py-2 bg-red-600/80 hover:bg-red-500 text-white font-bold rounded-full shadow-[0_0_20px_rgba(220,38,38,0.6)] border border-red-400 backdrop-blur-sm transition-all">Đóng VR</button>
      </div>
      <div className="absolute top-10 w-full text-center pointer-events-none">
        <h2 className="text-white text-4xl font-black animate-pulse tracking-[15px] text-cyan-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.8)]">WEBVR SPACE GALLERY</h2>
        <p className="text-slate-400 mt-2 font-mono text-sm">(Click và kéo chuột để xoay 360 độ)</p>
      </div>
      
      {/* 3D Scene */}
      <div className="relative w-[400px] h-[300px] transform-style-3d transition-transform duration-75 ease-out" style={{ transform: `translateZ(-600px) rotateY(${rotation}deg)` }}>
        {targets.map((t, i) => {
           const angle = i * 45; // 360 / 8
           const zTranslate = 550; // Distance from center
           return (
             <div key={i} className="absolute inset-0 border-[4px] border-slate-700 bg-slate-900/90 shadow-[0_0_80px_rgba(59,130,246,0.3)] flex flex-col items-center justify-center rounded-xl overflow-hidden backface-hidden"
                  style={{ transform: `rotateY(${angle}deg) translateZ(${zTranslate}px)` }}>
               
               {/* Giả lập hình ảnh */}
               <div className="w-full h-full bg-slate-800 flex flex-col items-center justify-center relative overflow-hidden group">
                 <div className="absolute inset-0 bg-[url('https://openseadragon.github.io/example-images/highsmith/highsmith.dzi')] opacity-30 bg-cover bg-center group-hover:scale-110 transition-transform duration-1000"></div>
                 <div className="text-6xl mb-4 relative z-10 group-hover:animate-bounce">🌌</div>
                 <div className="text-xl font-bold text-blue-300 relative z-10 text-center px-4 leading-tight drop-shadow-[0_0_10px_black]">{t}</div>
                 <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/90 to-transparent"></div>
               </div>
               
               {/* Khung tên */}
               <div className="absolute bottom-0 w-full p-4 text-center font-bold text-white bg-black/80 backdrop-blur-md border-t border-slate-600">
                  Phân tích: AI Gemini
               </div>
             </div>
           );
        })}
      </div>

      {/* Particle field for VR background */}
      <div className="absolute inset-0 pointer-events-none transform-style-3d">
         {[...Array(50)].map((_, i) => (
            <div key={i} className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]" 
                 style={{ 
                   left: `${Math.random() * 100}%`, 
                   top: `${Math.random() * 100}%`,
                   transform: `translateZ(${(Math.random() * 2000) - 1000}px)`,
                   opacity: Math.random()
                 }}></div>
         ))}
      </div>

      <style>{`.transform-style-3d { transform-style: preserve-3d; } .backface-hidden { backface-visibility: hidden; }`}</style>
    </div>
  );
};
