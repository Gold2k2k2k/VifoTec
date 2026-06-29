export type ChatSession = { id: string; title: string; messages: {role: string, text: string}[] };
export type InteractionMode = 'none'|'mark'|'select'|'measure'|'magnify'|'blackhole';
export type SpectrumMode = 'NIRCAM' | 'MIRI' | 'XRAY';

export const POPULAR_TARGETS = [
  "M1 (Crab Nebula)", "M8 (Lagoon Nebula)", "M16 (Eagle Nebula / Pillars of Creation)", 
  "M31 (Andromeda Galaxy)", "M42 (Orion Nebula)", "M45 (Pleiades)", "M51 (Whirlpool Galaxy)", 
  "M57 (Ring Nebula)", "M87 (Virgo A)", "M101 (Pinwheel Galaxy)", "M104 (Sombrero Galaxy)",
  "Carina Nebula", "Tarantula Nebula", "Stephan's Quintet", "Cartwheel Galaxy", 
  "Southern Ring Nebula", "NGC 3324", "NGC 7320", "SMACS 0723", "Jupiter", "Saturn", "Neptune"
];

export const PROMPT_TEMPLATES = [
  "Tóm tắt thông tin thành 3 ý chính",
  "Giải thích đoạn mã này cho người mới",
  "Phân tích cấu trúc của thiên thể này",
  "Tạo báo cáo khoa học về khu vực này"
];

export const MOCK_TOURS: Record<string, any[]> = {
  "M101": [
    { x: 0.5, y: 0.5, zoom: 1, text: "Chào mừng bạn đến với thiên hà Chong Chóng M101. Nhìn từ xa, nó giống như một bông hoa ánh sáng khổng lồ." },
    { x: 0.35, y: 0.65, zoom: 3, text: "Đây là một trong những nhánh xoắn ốc ngoại vi, nơi chứa các cụm sao trẻ đang hình thành rực rỡ." },
    { x: 0.5, y: 0.5, zoom: 8, text: "Tiến sâu vào trung tâm lõi thiên hà, nơi có mật độ năng lượng và bức xạ dày đặc nhất." }
  ],
  "DEFAULT": [
    { x: 0.5, y: 0.5, zoom: 1, text: "Bắt đầu quét tổng thể thiên thể... Đang thu thập phổ ánh sáng." },
    { x: 0.4, y: 0.4, zoom: 4, text: "Phát hiện vùng nhiễu loạn bức xạ ở khu vực phía Tây Bắc." },
    { x: 0.7, y: 0.7, zoom: 2.5, text: "Khu vực này có chứa nhiều bụi sao nguyên thủy. Chuyến tham quan tự động hoàn tất." }
  ]
};

export const QUIZZES: Record<string, any[]> = {
  "M101": [
     { q: "Thiên hà M101 còn được gọi là gì?", options: ["Thiên hà Tiên Nữ", "Thiên hà Chong Chóng", "Mũ Sombrero", "Bóng Ma"], ans: 1 },
     { q: "Nó cách Trái Đất khoảng bao xa?", options: ["2.5 triệu năm ánh sáng", "21 triệu năm ánh sáng", "100 ngàn năm ánh sáng", "1 tỷ năm ánh sáng"], ans: 1 }
  ],
  "DEFAULT": [
     { q: "Kính viễn vọng James Webb sử dụng loại sóng nào để nhìn xuyên qua lớp bụi vũ trụ dày đặc?", options: ["Tia X", "Hồng ngoại", "Tử ngoại", "Ánh sáng khả kiến"], ans: 1 },
     { q: "Điểm Lagrange L2 (nơi đỗ của JWST) cách Trái Đất bao xa?", options: ["400.000 km", "1.5 triệu km", "10 triệu km", "150 triệu km"], ans: 1 },
     { q: "Đường kính của tấm gương chính (Primary Mirror) trên JWST là bao nhiêu?", options: ["2.4 mét", "4.5 mét", "6.5 mét", "10 mét"], ans: 2 }
  ]
};
