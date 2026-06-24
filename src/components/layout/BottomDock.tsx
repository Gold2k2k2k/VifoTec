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
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-out">
      <div className="bg-slate-950/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-2 flex items-center gap-2 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={item.onClick}
            title={item.label}
            className={`
              relative group flex flex-col items-center justify-center
              w-12 h-12 md:w-16 md:h-16 rounded-xl transition-all duration-300
              ${item.isActive ? 'bg-blue-500/20 border border-blue-500/50' : 'hover:bg-slate-800/60 border border-transparent'}
            `}
          >
            <span className={`text-xl md:text-2xl transition-transform duration-300 ${item.isActive ? 'scale-110' : 'group-hover:scale-110 group-hover:-translate-y-1'}`}>
              {item.icon}
            </span>
            
            {/* Active Indicator */}
            {item.isActive && (
              <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]" />
            )}

            {/* Tooltip */}
            <div className="absolute -top-10 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 bg-slate-900 border border-slate-700 text-slate-200 text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none">
              {item.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
