import React from 'react';

export const BottomDock: React.FC<any> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="flex justify-center mt-6 z-50 absolute bottom-8 left-0 right-0 pointer-events-none">
      <div className="glass-panel rounded-full flex items-center px-8 py-4 gap-8 pointer-events-auto transform transition-transform hover:scale-[1.02] duration-300">
        {items.map((item: any, idx: number) => (
          <React.Fragment key={item.id}>
            <div 
              onClick={item.onClick}
              className={`flex flex-col items-center gap-2 cursor-pointer group transition-all duration-300 ${
                item.isActive ? 'scale-110' : 'hover:scale-110'
              }`}
            >
              <div className={`p-2 rounded-full transition-all duration-300 ${
                item.isActive 
                  ? 'bg-[var(--ks-kinpaku-gold)] text-[var(--ks-lacquer-deep)] shadow-[0_0_15px_var(--ks-kinpaku-gold)]' 
                  : 'bg-transparent text-[var(--ks-text-muted)] group-hover:text-[var(--ks-champagne)] group-hover:bg-white/10'
              }`}>
                {item.icon}
              </div>
              <span 
                className={`text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                  item.isActive ? 'text-[var(--ks-kinpaku-gold)] font-bold' : 'text-[var(--ks-text-muted)] group-hover:text-[var(--ks-champagne)]'
                }`} 
                style={{fontFamily: 'var(--font-mono)'}}
              >
                {item.label}
              </span>
            </div>
            
            {idx < items.length - 1 && (
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-[var(--ks-gold-hairline-strong)] to-transparent opacity-50"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
