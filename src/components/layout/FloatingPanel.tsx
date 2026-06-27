import React from 'react';

export const FloatingPanel: React.FC<any> = ({ isOpen, children, title }) => {
  if (!isOpen) return null;
  return (
    <div style={{ position: 'absolute', right: 0, top: 50, bottom: 0, width: '300px', background: '#222', zIndex: 100, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '10px', borderBottom: '1px solid #444', fontWeight: 'bold' }}>{title}</div>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
};
