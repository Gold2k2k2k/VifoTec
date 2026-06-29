import React from 'react';
import StellariumSky from '../components/StellariumSky';

const StarMap = () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: 'calc(100vh - 70px)', marginTop: '70px', background: '#000' }}>
      <StellariumSky isVisible={true} onClose={() => {}} />
    </div>
  );
};

export default StarMap;
