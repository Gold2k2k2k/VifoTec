import React from 'react';
import { IconClose } from '../Icons';

interface FloatingPanelProps {
  position: 'left' | 'right';
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
  width = 'w-[360px]'
}) => {
  const translateClass = !isOpen
    ? position === 'left' ? '-translate-x-[110%] opacity-0' : 'translate-x-[110%] opacity-0'
    : 'translate-x-0 opacity-100';

  const posClass = position === 'left' ? 'left-6 top-24 bottom-24' : 'right-6 top-24 bottom-24';

  return (
    <div 
      className={`
        absolute ${posClass} ${width} z-40
        flex flex-col
        transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
        ${translateClass}
        ${className}
      `}
      role="complementary"
      aria-label={typeof title === 'string' ? title : 'Panel'}
    >
      <div className="flex-1 flex flex-col glass-panel overflow-hidden relative shadow-2xl border-white/5">
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
              <h3 className="text-[11px] font-medium text-white/80 tracking-[0.2em] uppercase" style={{ fontFamily: 'var(--font-body)' }}>
                {title}
              </h3>
            </div>
            {onClose && (
              <button 
                onClick={onClose}
                className="btn-icon w-8 h-8 opacity-50 hover:opacity-100 transition-opacity border-0"
                aria-label="Close panel"
              >
                <IconClose size={14} />
              </button>
            )}
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
};
