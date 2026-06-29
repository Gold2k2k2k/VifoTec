import React from 'react';

const newsItems = [
  { title: 'Kính thiên văn James Webb chụp ảnh tinh vân Orion', category: 'Nhiếp ảnh', date: '29/06/2026', img: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80' },
  { title: 'Phát hiện ngoại hành tinh mới có thể có nước', category: 'Nghiên cứu', date: '28/06/2026', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80' },
  { title: 'Tàu thăm dò chạm tới bầu khí quyển của Mặt Trời', category: 'Nhiệm vụ', date: '25/06/2026', img: 'https://images.unsplash.com/photo-1542662565-7e4fd86c207b?w=800&q=80' },
  { title: 'Sự hình thành của lỗ đen siêu khối lượng', category: 'Vũ trụ học', date: '22/06/2026', img: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=800&q=80' },
];

const NewsGallery = () => {
  return (
    <div className="main-content">
      <div className="page-header">
        <h1 className="title-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Tin tức & Ảnh Vũ trụ</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Cập nhật những khám phá và hình ảnh mới nhất từ các đài thiên văn trên toàn thế giới.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '2rem' }}>
        {newsItems.map((news, idx) => (
          <div key={idx} className="glass-panel" style={{ overflow: 'hidden', borderRadius: '16px', cursor: 'pointer' }}>
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <img 
                src={news.img} 
                alt={news.title} 
                style={{ width: '100%', height: '250px', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(0,0,0,0.6)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', backdropFilter: 'blur(4px)' }}>
                {news.category}
              </div>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{news.date}</div>
              <h3 style={{ fontSize: '1.3rem', lineHeight: 1.4 }}>{news.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsGallery;
