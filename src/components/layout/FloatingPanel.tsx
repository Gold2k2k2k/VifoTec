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
  width = 'w-[340px]'
}) => {
  const translateClass = !isOpen
    ? position === 'left' ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0'
    : 'translate-x-0 opacity-100';

  const posClass = position === 'left' ? 'left-0 top-16 bottom-16' : 'right-0 top-16 bottom-16';

  return (
    <div 
      className={`
        absolute ${posClass} ${width} z-40
        flex flex-col
        transition-all duration-500 ease-out
        ${translateClass}
        ${className}
      `}
      role="complementary"
      aria-label={typeof title === 'string' ? title : 'Panel'}
    >
      <div className="flex-1 flex flex-col hud-panel m-2 rounded-lg overflow-hidden relative">
        {/* Subtle scanline */}
        <div className="scanline-overlay rounded-lg" />

        {title && (
          <div className="hud-panel-header relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" style={{ animation: 'pulse-glow 2s infinite' }} />
              <h3 className="text-[11px] font-semibold text-slate-300 tracking-wider uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
                {title}
              </h3>
            </div>
            {onClose && (
              <button 
                onClick={onClose}
                className="btn-icon w-6 h-6 border-0"
                aria-label="Close panel"
              >
                <IconClose size={14} />
              </button>
            )}
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
};
