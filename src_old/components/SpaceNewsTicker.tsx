import React, { useState, useEffect } from 'react';

export const SpaceNewsTicker: React.FC = () => {
  const [spaceNews, setSpaceNews] = useState<string>("Đang kết nối hệ thống trinh sát NASA...");

  useEffect(() => {
    fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
      .then(res => res.json())
      .then(data => {
        setSpaceNews(`🛰️ BẢN TIN VŨ TRỤ NASA: Ảnh nổi bật hôm nay là "${data.title}"... | ☄️ THỜI TIẾT KHÔNG GIAN: Hoạt động của Mặt Trời ở mức bình thường... | 🔭 CẬP NHẬT JWST: Đang tiếp tục quét phổ quang học vùng hồng ngoại sâu... | 🌌 KHÁM PHÁ MỚI: Các nhà khoa học vừa tìm thấy dấu vết phân tử hữu cơ trong Tinh vân Orion...`);
      })
      .catch(() => {
        setSpaceNews("🛰️ BẢN TIN VŨ TRỤ NASA: Hệ thống đang sử dụng mạng lưới dự phòng... | ☄️ THỜI TIẾT KHÔNG GIAN: Cảnh báo bão Mặt Trời (Solar Flare) cấp độ X tại góc tọa độ 45... | 🔭 CẬP NHẬT JWST: Đang xử lý và phân tách dữ liệu đa phổ (MIRI/NIRCam)...");
      });
  }, []);

  return (
    <div className="h-8 bg-slate-950 border-t border-slate-800 flex items-center overflow-hidden flex-shrink-0 z-20">
       <div className="bg-red-600 text-white text-xs font-bold px-3 py-2 z-10 flex-shrink-0">LIVE</div>
       <div className="whitespace-nowrap animate-[marquee_30s_linear_infinite] text-emerald-400 text-xs font-mono ml-4 tracking-wider">
          {spaceNews}
       </div>
       <style>{`@keyframes marquee { 0% { transform: translateX(100vw); } 100% { transform: translateX(-100%); } }`}</style>
    </div>
  );
};
