import React from 'react';

const planetData = [
  { name: 'Thủy tinh', type: 'Hành tinh đất đá', temp: '430°C', img: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=500&q=80', color: '#a8a8a8' },
  { name: 'Kim tinh', type: 'Hành tinh đất đá', temp: '471°C', img: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?w=500&q=80', color: '#e3bb76' },
  { name: 'Trái đất', type: 'Hành tinh đất đá', temp: '16°C', img: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=500&q=80', color: '#3b82f6' }, // Placeholder images
  { name: 'Hỏa tinh', type: 'Hành tinh đất đá', temp: '-28°C', img: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?w=500&q=80', color: '#c1440e' },
];

const Planets = () => {
  return (
    <div className="main-content">
      <div className="page-header">
        <h1 className="title-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Từ điển Hành tinh</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Tra cứu dữ liệu khoa học về các hành tinh trong hệ mặt trời của chúng ta.</p>
      </div>

      <div className="grid-cards">
        {planetData.map((p, idx) => (
          <div key={idx} className="card glass-panel" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: p.color }}></div>
            <img src={p.img} alt={p.name} />
            <div style={{ marginTop: '1rem' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{p.name}</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Phân loại:</span>
                <span style={{ color: 'white' }}>{p.type}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                <span>Nhiệt độ TB:</span>
                <span style={{ color: 'white' }}>{p.temp}</span>
              </div>
            </div>
            <button className="glass-panel" style={{ marginTop: '1rem', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border-glass)', borderRadius: '8px', cursor: 'pointer' }}>
              Xem chi tiết
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Planets;
