import React from 'react';

interface DockItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

interface BottomDockProps {
  items: DockItem[];
}

export const BottomDock: React.FC<BottomDockProps> = ({ items }) => {
  return (
    <nav 
      className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[100]"
      role="tablist"
      aria-label="View switcher"
    >
      <div className="hud-panel rounded-xl px-2 py-1.5 flex items-center gap-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={item.onClick}
            role="tab"
            aria-selected={item.isActive}
            aria-label={item.label}
            className={`
              relative group flex flex-col items-center justify-center
              w-14 h-12 md:w-16 md:h-12 rounded-lg cursor-pointer
              transition-all duration-200
              ${item.isActive 
                ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 shadow-[0_0_12px_rgba(0,255,255,0.1)]' 
                : 'bg-transparent border border-transparent text-slate-500 hover:bg-slate-800/50 hover:text-slate-300'}
            `}
          >
            <span className={`transition-transform duration-200 ${item.isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
              {item.icon}
            </span>
            
            {/* Active dot */}
            {item.isActive && (
              <span className="absolute -bottom-0.5 w-5 h-0.5 rounded-full bg-cyan-400" />
            )}

            {/* Tooltip */}
            <div className="absolute -top-10 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-150 hud-panel rounded-md text-slate-300 text-[10px] px-2.5 py-1 whitespace-nowrap pointer-events-none" style={{ fontFamily: 'var(--font-mono)' }}>
              {item.label}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#12121A] border-b border-r border-slate-700/50 rotate-45" />
            </div>
          </button>
        ))}
      </div>
    </nav>
  );
};
