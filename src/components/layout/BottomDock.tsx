import React from 'react';

interface DockItem {
  id: string;
  label: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}

interface BottomDockProps {
  items: DockItem[];
}

export const BottomDock: React.FC<BottomDockProps> = ({ items }) => {
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-out font-mono">
      <div className="bg-[#0B0F19]/80 backdrop-blur-3xl border-t border-l border-r border-cyan-500/40 p-2 flex items-center gap-1 shadow-[0_0_30px_rgba(34,211,238,0.2)] relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-300"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-300"></div>

        {items.map((item) => (
          <button
            key={item.id}
            onClick={item.onClick}
            className={`
              relative group flex flex-col items-center justify-center
              w-14 h-14 md:w-20 md:h-16 transition-all duration-300
              ${item.isActive ? 'bg-cyan-600/30 border border-cyan-400 shadow-[inset_0_0_15px_rgba(34,211,238,0.4)]' : 'bg-cyan-950/20 border border-cyan-900/50 hover:bg-cyan-900/50 hover:border-cyan-500/50'}
            `}
          >
            <span className={`text-xl md:text-2xl transition-transform duration-300 ${item.isActive ? 'scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'group-hover:scale-110 group-hover:-translate-y-1 opacity-70 group-hover:opacity-100'}`}>
              {item.icon}
            </span>
            
            {/* Active Indicator */}
            {item.isActive && (
              <span className="absolute bottom-1 w-8 h-1 bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
            )}

            {/* Tooltip */}
            <div className="absolute -top-12 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 bg-[#0B0F19]/95 border border-cyan-500/50 text-cyan-300 text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 whitespace-nowrap pointer-events-none shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              {item.label}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0B0F19] border-b border-r border-cyan-500/50 rotate-45"></div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
