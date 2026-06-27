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
      className="absolute bottom-0 left-16 right-0 h-16 z-[80] flex items-center justify-center bg-gradient-to-t from-black/80 to-transparent pointer-events-none"
      role="tablist"
    >
      <div className="flex items-center gap-2 pointer-events-auto bg-black/40 backdrop-blur-2xl border border-white/10 px-4 py-2 rounded-2xl shadow-2xl mb-4">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={item.onClick}
            role="tab"
            aria-selected={item.isActive}
            className={`
              flex items-center gap-3 px-6 py-2.5 rounded-xl cursor-pointer
              transition-all duration-300
              ${item.isActive 
                ? 'bg-white/15 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/20' 
                : 'bg-transparent text-white/50 border border-transparent hover:bg-white/5 hover:text-white/90'}
            `}
          >
            <span className={`transition-transform duration-300 ${item.isActive ? 'scale-110' : ''}`}>
              {item.icon}
            </span>
            <span className="text-xs tracking-widest uppercase font-medium" style={{ fontFamily: 'var(--font-heading)' }}>
              {item.label}
            </span>
            {item.isActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 ml-2 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};
