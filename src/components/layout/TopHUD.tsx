import React from 'react';

export const TopHUD: React.FC<any> = ({ executeSearch, activeLayer }) => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50px', background: '#111', display: 'flex', alignItems: 'center', padding: '0 20px', justifyContent: 'space-between', zIndex: 100 }}>
      <div>JWST Explorer (Barebones)</div>
      <input 
        type="text" 
        placeholder="Search..." 
        style={{ color: '#000', padding: '5px' }}
        onKeyDown={(e) => { 
          if (e.key === 'Enter') {
            executeSearch(e.currentTarget.value);
            e.currentTarget.value = '';
          }
        }} 
      />
      <div>Layer: {activeLayer}</div>
    </div>
  );
};
