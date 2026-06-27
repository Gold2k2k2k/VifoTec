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
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[100]"
      role="tablist"
      aria-label="View switcher"
    >
      <div className="glass-pill px-3 py-2 flex items-center gap-2 border-white/10 shadow-2xl">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={item.onClick}
            role="tab"
            aria-selected={item.isActive}
            aria-label={item.label}
            className={`
              relative group flex flex-col items-center justify-center
              w-12 h-12 rounded-full cursor-pointer
              transition-all duration-300
              ${item.isActive 
                ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] scale-105' 
                : 'bg-transparent text-white/50 hover:bg-white/5 hover:text-white/90 hover:scale-105'}
            `}
          >
            <span className={`transition-transform duration-300 ${item.isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
              {item.icon}
            </span>
            
            {/* Active dot */}
            {item.isActive && (
              <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            )}

            {/* Tooltip */}
            <div className="absolute -top-12 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 glass-pill px-3 py-1.5 whitespace-nowrap pointer-events-none border-white/5" style={{ fontFamily: 'var(--font-mono)' }}>
              <span className="text-white/80 text-[10px] tracking-widest uppercase">{item.label}</span>
            </div>
          </button>
        ))}
      </div>
    </nav>
  );
};
