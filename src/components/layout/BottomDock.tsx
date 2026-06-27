import React from 'react';

export const BottomDock: React.FC<any> = ({ items }) => {
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 100, right: 300, height: '50px', background: '#111', display: 'flex', gap: '10px', padding: '10px', zIndex: 90 }}>
      {items && items.map((item: any) => (
        <button key={item.id} onClick={item.onClick} style={{ padding: '5px', background: item.isActive ? '#333' : '#000', color: '#fff' }}>
          {item.label}
        </button>
      ))}
    </div>
  );
};
