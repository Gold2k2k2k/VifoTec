import React from 'react';

export const FloatingPanel: React.FC<any> = ({ isOpen, children }) => {
  if (!isOpen) return null;
  return (
    <div className="absolute right-0 top-16 bottom-0 w-[450px] border-l border-[var(--ks-gold-hairline)] z-[90] bg-[var(--ks-raised-lacquer)] shadow-[-24px_0_70px_rgba(2,0,5,0.42)]">
      {children}
    </div>
  );
};
