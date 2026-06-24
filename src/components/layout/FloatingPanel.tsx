import React from 'react';

interface FloatingPanelProps {
  position: 'left' | 'right' | 'top' | 'bottom';
  isOpen: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  width?: string;
}

export const FloatingPanel: React.FC<FloatingPanelProps> = ({ 
  position, 
  isOpen, 
  onClose, 
  title, 
  children,
  className = '',
  width = 'w-[340px]' // Slightly wider for HUD layout
}) => {
  // Determine translation based on position and open state
  let transform = '';
  if (!isOpen) {
    if (position === 'left') transform = '-translate-x-[120%] opacity-0 rotate-y-[-10deg] scale-95';
    if (position === 'right') transform = 'translate-x-[120%] opacity-0 rotate-y-[10deg] scale-95';
    if (position === 'top') transform = '-translate-y-[120%] opacity-0 scale-95';
    if (position === 'bottom') transform = 'translate-y-[120%] opacity-0 scale-95';
  } else {
    transform = 'translate-x-0 translate-y-0 opacity-100 rotate-y-0 scale-100';
  }

  const posClasses = {
    left: 'left-6 top-24 bottom-28 perspective-[1000px]',
    right: 'right-6 top-24 bottom-28 perspective-[1000px]',
    top: 'top-6 left-1/2 -translate-x-1/2 perspective-[1000px]',
    bottom: 'bottom-28 left-1/2 -translate-x-1/2 perspective-[1000px]'
  };

  return (
    <div 
      className={`
        absolute ${posClasses[position]} ${width} z-40
        flex flex-col
        transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1)
        ${transform}
        ${className}
      `}
    >
      <div className="flex-1 flex flex-col bg-[#0B0F19]/70 backdrop-blur-3xl border border-cyan-500/30 rounded-lg shadow-[0_0_40px_rgba(6,182,212,0.15)] overflow-hidden relative">
        
        {/* Futuristic Corner Accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400/80 rounded-tl-lg pointer-events-none z-10"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400/80 rounded-tr-lg pointer-events-none z-10"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400/80 rounded-bl-lg pointer-events-none z-10"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400/80 rounded-br-lg pointer-events-none z-10"></div>

        {/* Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:100%_4px] mix-blend-screen z-0"></div>

        {title && (
          <div className="flex items-center justify-between p-3 border-b border-cyan-500/30 bg-cyan-950/40 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>
              <h3 className="font-mono font-bold text-cyan-300 tracking-[0.2em] uppercase text-[10px]">{title}</h3>
            </div>
            {onClose && (
              <button 
                onClick={onClose}
                className="text-cyan-600 hover:text-cyan-300 hover:bg-cyan-900/50 transition-all w-6 h-6 flex items-center justify-center rounded-sm font-mono text-xs border border-transparent hover:border-cyan-500/30"
              >
                [X]
              </button>
            )}
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-1 relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
};
