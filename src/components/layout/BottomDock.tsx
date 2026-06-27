import React from 'react';

export const BottomDock: React.FC<any> = ({ items }) => {
  return (
    <div className="absolute bottom-0 left-16 right-[450px] h-16 bg-[var(--ks-lacquer-deep)] border-t border-[var(--ks-gold-hairline)] flex items-center px-6 gap-4 z-[80]">
      {items && items.map((item: any) => (
        <button 
          key={item.id} 
          onClick={item.onClick} 
          className={`px-6 h-10 flex items-center gap-3 border transition-all duration-200 rounded-[2px] ${
            item.isActive
              ? 'bg-[var(--ks-kinpaku-gold)] border-[var(--ks-kinpaku-gold)] text-[var(--ks-lacquer-deep)]'
              : 'bg-[var(--ks-graphite)] border-[var(--ks-gold-hairline)] text-[var(--ks-kinpaku-gold)] hover:bg-[var(--ks-graphite-2)]'
          }`}
        >
          {item.icon && <span>{item.icon}</span>}
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 500 }}>
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
};
