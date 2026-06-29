import React from 'react';
import SolarSystem from '../components/SolarSystem';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <SolarSystem />
      
      <div className="overlay-content" style={{ padding: '4rem 2rem', maxWidth: '800px', pointerEvents: 'none' }}>
        <div className="glass-panel animate-float" style={{ padding: '3rem', pointerEvents: 'auto', display: 'inline-block' }}>
          <h1 style={{ fontSize: '4rem', marginBottom: '1rem', lineHeight: 1.1 }}>
            Khám Phá <br />
            <span className="title-gradient">Vũ Trụ Vô Tận</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '500px', lineHeight: 1.6 }}>
            Trải nghiệm không gian đa chiều, hệ mặt trời 3D trực quan và đắm mình vào những bản đồ sao tuyệt đẹp nhất.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Bắt đầu hành trình <ArrowRight size={20} />
            </button>
            <button className="glass-panel" style={{ padding: '12px 24px', color: 'white', border: '1px solid var(--border-glass)', cursor: 'pointer', background: 'transparent' }}>
              Tìm hiểu thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
