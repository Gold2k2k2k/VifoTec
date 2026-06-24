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
  width = 'w-80'
}) => {
  // Determine translation based on position and open state
  let transform = '';
  if (!isOpen) {
    if (position === 'left') transform = '-translate-x-full opacity-0';
    if (position === 'right') transform = 'translate-x-full opacity-0';
    if (position === 'top') transform = '-translate-y-full opacity-0';
    if (position === 'bottom') transform = 'translate-y-full opacity-0';
  } else {
    transform = 'translate-x-0 translate-y-0 opacity-100';
  }

  const posClasses = {
    left: 'left-4 top-20 bottom-24',
    right: 'right-4 top-20 bottom-24',
    top: 'top-4 left-1/2 -translate-x-1/2',
    bottom: 'bottom-24 left-1/2 -translate-x-1/2'
  };

  return (
    <div 
      className={`
        absolute ${posClasses[position]} ${width} z-40
        flex flex-col
        transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
        ${transform}
        ${className}
      `}
    >
      <div className="flex-1 flex flex-col bg-slate-950/70 backdrop-blur-2xl border border-slate-700/50 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
        
        {title && (
          <div className="flex items-center justify-between p-4 border-b border-slate-800/60 bg-slate-900/40">
            <h3 className="font-bold text-slate-200 tracking-wide uppercase text-sm">{title}</h3>
            {onClose && (
              <button 
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors w-6 h-6 flex items-center justify-center rounded-full hover:bg-slate-800"
              >
                ✕
              </button>
            )}
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          {children}
        </div>
      </div>
    </div>
  );
};
