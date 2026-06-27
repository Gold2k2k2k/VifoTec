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
  width = 'w-[450px]'
}) => {
  const translateClass = !isOpen
    ? position === 'left' ? '-translate-x-[100%]' : 'translate-x-[100%]'
    : 'translate-x-0';

  const posClass = position === 'left' ? 'left-0' : 'right-0';

  return (
    <div 
      className={`
        absolute ${posClass} top-0 bottom-0 ${width} z-[90]
        flex flex-col
        transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
        ${translateClass}
        ${className}
      `}
      role="complementary"
    >
      <div className="flex-1 flex flex-col bg-black/40 backdrop-blur-3xl border-l border-white/10 shadow-2xl relative">
        {title && (
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
              <h3 className="text-xs font-medium text-white/90 tracking-[0.2em] uppercase" style={{ fontFamily: 'var(--font-body)' }}>
                {title}
              </h3>
            </div>
            {onClose && (
              <button 
                onClick={onClose}
                className="btn-icon w-8 h-8 opacity-50 hover:opacity-100 transition-opacity border-0 cursor-pointer"
                aria-label="Close panel"
              >
                <IconClose size={16} />
              </button>
            )}
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
};
