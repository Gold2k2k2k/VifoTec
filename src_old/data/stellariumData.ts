export interface Star {
  id: number; // HIP number
  name: string;
  designation: string;
  ra: number; // decimal hours (0-24)
  dec: number; // decimal degrees (-90 to 90)
  mag: number; // visual magnitude
  color: string; // B-V color index code (hex color representing temperature)
  dist: number; // distance in light years
  desc?: string;
}

export interface Constellation {
  id: string;
  name: string;
  vnName: string;
  lines: number[][]; // array of pairs [hip1, hip2]
  artUrl?: string;
}

export interface DSO {
  id: string;
  name: string;
  type: 'galaxy' | 'nebula' | 'cluster';
  ra: number; // decimal hours
  dec: number; // decimal degrees
  mag: number;
  dist: number;
  desc: string;
}

export interface Planet {
  id: string;
  name: string;
  vnName: string;
  color: string;
  size: number;
  desc: string;
  // Dynamic RA/Dec will be computed using Keplerian elements
}

// 120 brightest stars that build the core shape of major constellations visible globally and in Vietnam
export const brightStars: Star[] = [
  // Polaris (North Star) - Ursa Minor
  { id: 11767, name: "Polaris", designation: "Alpha Ursae Minoris", ra: 2.53, dec: 89.26, mag: 1.97, color: "#fffbeb", dist: 433, desc: "Sao Bắc Cực, ngôi sao định hướng phương Bắc cực kỳ quan trọng cho người đi biển suốt hàng ngàn năm qua." },
  { id: 72607, name: "Kochab", designation: "Beta Ursae Minoris", ra: 14.85, dec: 74.15, mag: 2.07, color: "#fed7aa", dist: 130, desc: "Ngôi sao sáng thứ hai trong chòm Tiểu Hùng, từng là sao cực bắc vào khoảng năm 1500 TCN đến 500 SCN." },
  { id: 75097, name: "Pherkad", designation: "Gamma Ursae Minoris", ra: 15.34, dec: 71.83, mag: 3.00, color: "#e0f2fe", dist: 480 },
  
  // Sirius (Dog Star) - Canis Major
  { id: 32349, name: "Sirius", designation: "Alpha Canis Majoris", ra: 6.75, dec: -16.72, mag: -1.46, color: "#f0f9ff", dist: 8.6, desc: "Sao Thiên Lang, ngôi sao sáng nhất trên bầu trời đêm. Trong văn hóa Ai Cập cổ đại, sự xuất hiện của sao này báo hiệu mùa lũ sông Nile." },
  { id: 33579, name: "Adhara", designation: "Epsilon Canis Majoris", ra: 6.98, dec: -28.97, mag: 1.50, color: "#e0f2fe", dist: 430 },
  { id: 34444, name: "Wezen", designation: "Delta Canis Majoris", ra: 7.14, dec: -26.32, mag: 1.83, color: "#fef3c7", dist: 1800 },
  { id: 30324, name: "Murzim", designation: "Beta Canis Majoris", ra: 6.38, dec: -17.96, mag: 1.98, color: "#e0f2fe", dist: 500 },
  { id: 35904, name: "Aludra", designation: "Eta Canis Majoris", ra: 7.40, dec: -29.30, mag: 2.40, color: "#e0f2fe", dist: 2000 },

  // Canopus - Carina
  { id: 30438, name: "Canopus", designation: "Alpha Carinae", ra: 6.40, dec: -52.70, mag: -0.74, color: "#ffffff", dist: 310, desc: "Sao Lão Nhân, ngôi sao sáng thứ hai trên bầu trời đêm. Trong văn hóa Đông Á, nó tượng trưng cho sự trường thọ." },
  { id: 45238, name: "Miaplacidus", designation: "Beta Carinae", ra: 9.22, dec: -69.72, mag: 1.67, color: "#e0f2fe", dist: 111 },

  // Alpha Centauri - Centaurus
  { id: 71683, name: "Rigil Kentaurus", designation: "Alpha Centauri", ra: 14.66, dec: -60.83, mag: -0.27, color: "#fef08a", dist: 4.37, desc: "Ngôi sao thuộc hệ sao gần Trái Đất nhất (Alpha Centauri), chỉ cách chúng ta hơn 4 năm ánh sáng." },
  { id: 68702, name: "Hadar", designation: "Beta Centauri", ra: 14.06, dec: -60.37, mag: 0.61, color: "#e0f2fe", dist: 350 },

  // Arcturus - Bootes
  { id: 69673, name: "Arcturus", designation: "Alpha Boötis", ra: 14.26, dec: 19.17, mag: -0.05, color: "#ffedd5", dist: 36.7, desc: "Sao Đại Giác, một sao khổng lồ đỏ sáng nhất ở bán thiên cầu bắc. Ngôi sao này đang di chuyển rất nhanh so với các sao lân cận." },
  { id: 71795, name: "Nekkar", designation: "Beta Boötis", ra: 15.03, dec: 40.39, mag: 3.49, color: "#fef3c7", dist: 219 },
  { id: 69733, name: "Izar", designation: "Epsilon Boötis", ra: 14.75, dec: 27.08, mag: 2.35, color: "#fed7aa", dist: 200 },
  { id: 71075, name: "Mufrid", designation: "Eta Boötis", ra: 13.91, dec: 18.39, mag: 2.68, color: "#fefbeb", dist: 37 },

  // Vega - Lyra
  { id: 91262, name: "Vega", designation: "Alpha Lyrae", ra: 18.62, dec: 38.78, mag: 0.03, color: "#f0f9ff", dist: 25, desc: "Sao Chức Nữ, ngôi sao xanh sáng nổi bật mùa hè. Nó được sử dụng làm mốc chuẩn (điểm 0) cho thang đo cấp sao biểu kiến." },
  { id: 92420, name: "Sheliak", designation: "Beta Lyrae", ra: 18.84, dec: 33.36, mag: 3.45, color: "#e0f2fe", dist: 960 },
  { id: 93194, name: "Sulafat", designation: "Gamma Lyrae", ra: 18.98, dec: 32.68, mag: 3.25, color: "#e0f2fe", dist: 620 },

  // Capella - Auriga
  { id: 24608, name: "Capella", designation: "Alpha Aurigae", ra: 5.28, dec: 46.00, mag: 0.08, color: "#fef08a", dist: 42.8, desc: "Sao Ngũ Đế Tòa II, một hệ bốn ngôi sao rực rỡ cách Trái Đất 43 năm ánh sáng." },
  { id: 28360, name: "Menkalinan", designation: "Beta Aurigae", ra: 5.99, dec: 44.95, mag: 1.90, color: "#f8fafc", dist: 81 },
  { id: 23015, name: "Almaaz", designation: "Epsilon Aurigae", ra: 5.03, dec: 43.82, mag: 3.03, color: "#ffffff", dist: 2000 },

  // Rigel - Orion
  { id: 24436, name: "Rigel", designation: "Beta Orionis", ra: 5.25, dec: -8.20, mag: 0.13, color: "#f0f9ff", dist: 860, desc: "Sao Tham Lang VI, ngôi sao siêu khổng lồ xanh cực kỳ nóng ở chân trái chòm Lạp Hộ (Orion)." },
  // Betelgeuse - Orion
  { id: 27989, name: "Betelgeuse", designation: "Alpha Orionis", ra: 5.92, dec: 7.41, mag: 0.42, color: "#fee2e2", dist: 640, desc: "Sao Sâm Túc Tứ, một siêu sao khổng lồ đỏ khổng lồ ở vai phải Lạp Hộ. Nó sắp kết thúc cuộc đời và sẽ bùng nổ thành siêu tân tinh trong tương lai gần." },
  { id: 25336, name: "Bellatrix", designation: "Gamma Orionis", ra: 5.42, dec: 6.35, mag: 1.64, color: "#e0f2fe", dist: 250 },
  { id: 27366, name: "Saiph", designation: "Kappa Orionis", ra: 5.79, dec: -9.67, mag: 2.07, color: "#e0f2fe", dist: 720 },
  { id: 26311, name: "Alnilam", designation: "Epsilon Orionis", ra: 5.60, dec: -1.20, mag: 1.69, color: "#e0f2fe", dist: 1300, desc: "Ngôi sao trung tâm trong Vành đai Orion (Tam Tinh)." },
  { id: 26727, name: "Alnitak", designation: "Zeta Orionis", ra: 5.68, dec: -1.94, mag: 1.74, color: "#e0f2fe", dist: 700 },
  { id: 25930, name: "Mintaka", designation: "Delta Orionis", ra: 5.53, dec: -0.30, mag: 2.23, color: "#e0f2fe", dist: 900 },

  // Procyon - Canis Minor
  { id: 37279, name: "Procyon", designation: "Alpha Canis Minoris", ra: 7.66, dec: 5.22, mag: 0.34, color: "#fefbeb", dist: 11.4, desc: "Sao Nam Tào, hệ sao nhị phân nằm rất gần hệ Mặt Trời của chúng ta." },
  { id: 36188, name: "Gomeisa", designation: "Beta Canis Minoris", ra: 7.45, dec: 8.29, mag: 2.89, color: "#e0f2fe", dist: 170 },

  // Achernar - Eridanus
  { id: 7588, name: "Achernar", designation: "Alpha Eridani", ra: 1.63, dec: -57.24, mag: 0.46, color: "#e0f2fe", dist: 144, desc: "Ngôi sao hình dẹt nhất từng được biết đến do tốc độ tự quay cực nhanh quanh trục." },

  // Altair - Aquila
  { id: 97649, name: "Altair", designation: "Alpha Aquilae", ra: 19.85, dec: 8.87, mag: 0.76, color: "#ffffff", dist: 16.7, desc: "Sao Ngưu Lang, ngôi sao sáng nổi tiếng trong truyền thuyết Ngưu Lang Chức Nữ của các nước Đông Á." },
  { id: 98036, name: "Tarazed", designation: "Gamma Aquilae", ra: 19.77, dec: 10.61, mag: 2.72, color: "#fed7aa", dist: 460 },
  { id: 97278, name: "Alshain", designation: "Beta Aquilae", ra: 19.92, dec: 6.40, mag: 3.71, color: "#fef3c7", dist: 45 },

  // Aldebaran - Taurus
  { id: 21421, name: "Aldebaran", designation: "Alpha Tauri", ra: 4.60, dec: 16.51, mag: 0.85, color: "#ffedd5", dist: 65, desc: "Sao Tất Độc V, mắt của chòm sao Kim Ngưu, một ngôi sao khổng lồ cam cổ xưa." },
  { id: 25428, name: "Elnath", designation: "Beta Tauri", ra: 5.43, dec: 28.60, mag: 1.65, color: "#ffffff", dist: 134 },

  // Spica - Virgo
  { id: 65474, name: "Spica", designation: "Alpha Virginis", ra: 13.42, dec: -11.16, mag: 0.98, color: "#e0f2fe", dist: 250, desc: "Sao Giác Túc Nhất, biểu tượng bông lúa mì trên tay cung nữ Virgo." },
  { id: 61941, name: "Porrima", designation: "Gamma Virginis", ra: 12.69, dec: -1.45, mag: 2.74, color: "#ffffff", dist: 38 },
  { id: 63608, name: "Vindemiatrix", designation: "Epsilon Virginis", ra: 13.04, dec: 10.95, mag: 2.85, color: "#fef08a", dist: 102 },

  // Antares - Scorpius
  { id: 80112, name: "Antares", designation: "Alpha Scorpii", ra: 16.49, dec: -26.43, mag: 1.06, color: "#fee2e2", dist: 550, desc: "Sao Tâm Túc Nhị (hay sao Hỏa giả), trái tim đỏ rực của chòm Bọ Cạp. Một siêu khổng lồ đỏ khổng lồ." },
  { id: 85927, name: "Shaula", designation: "Lambda Scorpii", ra: 17.56, dec: -37.10, mag: 1.62, color: "#e0f2fe", dist: 700, desc: "Ngôi sao ngòi độc ở đuôi Bọ Cạp." },
  { id: 78820, name: "Dschubba", designation: "Delta Scorpii", ra: 16.01, dec: -22.62, mag: 2.29, color: "#e0f2fe", dist: 400 },
  { id: 86228, name: "Sargas", designation: "Theta Scorpii", ra: 17.62, dec: -43.00, mag: 1.86, color: "#fed7aa", dist: 270 },
  { id: 78401, name: "Acrab", designation: "Beta Scorpii", ra: 16.09, dec: -19.80, mag: 2.56, color: "#e0f2fe", dist: 530 },

  // Pollux & Castor - Gemini
  { id: 37826, name: "Pollux", designation: "Beta Geminorum", ra: 7.75, dec: 28.02, mag: 1.14, color: "#fed7aa", dist: 34, desc: "Ngôi sao khổng lồ cam sáng nhất chòm Song Tử, anh em sinh đôi với Castor." },
  { id: 36850, name: "Castor", designation: "Alpha Geminorum", ra: 7.58, dec: 31.88, mag: 1.58, color: "#ffffff", dist: 52, desc: "Hệ sao sáu ngôi sao phức tạp, là mắt của người anh em sinh đôi Castor." },
  { id: 31681, name: "Alhena", designation: "Gamma Geminorum", ra: 6.63, dec: 16.39, mag: 1.93, color: "#ffffff", dist: 109 },

  // Fomalhaut - Piscis Austrinus
  { id: 113136, name: "Fomalhaut", designation: "Alpha Piscis Austrini", ra: 22.96, dec: -29.62, mag: 1.16, color: "#ffffff", dist: 25, desc: "Ngôi sao cô đơn của mùa thu phương nam, nổi tiếng vì có một đĩa bụi dày đặc bao quanh trông như Con Mắt của Sauron." },

  // Deneb - Cygnus
  { id: 102098, name: "Deneb", designation: "Alpha Cygni", ra: 20.69, dec: 45.28, mag: 1.25, color: "#ffffff", dist: 2600, desc: "Đuôi của Thiên Nga. Một siêu khổng lồ trắng cực kỳ xa xôi nhưng vẫn sáng chói lọi nhờ độ sáng tuyệt đối siêu khủng." },
  { id: 95947, name: "Albireo", designation: "Beta Cygni", ra: 19.51, dec: 27.96, mag: 3.05, color: "#fef08a", dist: 430, desc: "Ngôi sao đôi đẹp nhất bầu trời với hai thành phần mang màu sắc đối lập xanh sapphire và vàng hổ phách." },
  { id: 100453, name: "Sadr", designation: "Gamma Cygni", ra: 20.37, dec: 40.26, mag: 2.23, color: "#fefbeb", dist: 1500 },
  { id: 102488, name: "Gienah", designation: "Epsilon Cygni", ra: 20.77, dec: 33.97, mag: 2.48, color: "#fed7aa", dist: 72 },
  { id: 97165, name: "Fawaris", designation: "Delta Cygni", ra: 19.61, dec: 45.13, mag: 2.86, color: "#ffffff", dist: 170 },

  // Crux (Southern Cross)
  { id: 60718, name: "Acrux", designation: "Alpha Crucis", ra: 12.44, dec: -63.10, mag: 0.77, color: "#e0f2fe", dist: 320, desc: "Ngôi sao sáng nhất trong chòm Nam Thập Tự phương nam." },
  { id: 61084, name: "Mimosa", designation: "Beta Crucis", ra: 12.79, dec: -59.68, mag: 1.25, color: "#e0f2fe", dist: 280 },
  { id: 62434, name: "Gacrux", designation: "Gamma Crucis", ra: 12.52, dec: -57.11, mag: 1.59, color: "#fca5a5", dist: 88 },
  { id: 59747, name: "Imai", designation: "Delta Crucis", ra: 12.25, dec: -58.75, mag: 2.79, color: "#e0f2fe", dist: 360 },

  // Regulus - Leo
  { id: 49669, name: "Regulus", designation: "Alpha Leonis", ra: 10.14, dec: 11.96, mag: 1.35, color: "#e0f2fe", dist: 79, desc: "Trái tim của chòm Sư Tử, nằm rất gần đường hoàng đạo." },
  { id: 57632, name: "Denebola", designation: "Beta Leonis", ra: 11.82, dec: 14.57, mag: 2.14, color: "#ffffff", dist: 36 },
  { id: 50583, name: "Algieba", designation: "Gamma Leonis", ra: 10.33, dec: 19.84, mag: 2.01, color: "#fef08a", dist: 130 },
  { id: 54872, name: "Zosma", designation: "Delta Leonis", ra: 11.23, dec: 20.52, mag: 2.56, color: "#ffffff", dist: 58 },
  { id: 54879, name: "Chertan", designation: "Theta Leonis", ra: 11.23, dec: 15.43, mag: 3.33, color: "#ffffff", dist: 165 },

  // Big Dipper (Ursa Major asterism)
  { id: 54061, name: "Dubhe", designation: "Alpha Ursae Majoris", ra: 11.06, dec: 61.75, mag: 1.81, color: "#fed7aa", dist: 123, desc: "Sao Thiên Khu, ngôi sao chỉ hướng Bắc cùng với Merak." },
  { id: 53910, name: "Merak", designation: "Beta Ursae Majoris", ra: 11.03, dec: 56.38, mag: 2.34, color: "#ffffff", dist: 79, desc: "Sao Thiên Tuyền, vạch một đường thẳng từ Merak qua Dubhe để tìm sao Bắc Cực." },
  { id: 58001, name: "Phecda", designation: "Gamma Ursae Majoris", ra: 11.89, dec: 53.69, mag: 2.41, color: "#ffffff", dist: 83 },
  { id: 59774, name: "Megrez", designation: "Delta Ursae Majoris", ra: 12.25, dec: 57.03, mag: 3.32, color: "#ffffff", dist: 81 },
  { id: 62956, name: "Alioth", designation: "Epsilon Ursae Majoris", ra: 12.90, dec: 55.97, mag: 1.76, color: "#ffffff", dist: 81, desc: "Sao Ngọc Hoành, ngôi sao sáng nhất trong chiếc đuôi của Gấu Lớn." },
  { id: 65378, name: "Mizar", designation: "Zeta Ursae Majoris", ra: 13.40, dec: 54.92, mag: 2.23, color: "#ffffff", dist: 83, desc: "Sao Khai Dương, một cặp sao đôi nổi tiếng có thể phân biệt bằng mắt thường (Mizar và Alcor)." },
  { id: 67301, name: "Alkaid", designation: "Eta Ursae Majoris", ra: 13.79, dec: 49.31, mag: 1.85, color: "#e0f2fe", dist: 101, desc: "Sao Dao Quang, đầu mút cuối cùng của tay cầm chiếc gàu sòng Đại Hùng." },

  // Cassiopeia
  { id: 746, name: "Caph", designation: "Beta Cassiopeiae", ra: 0.15, dec: 59.15, mag: 2.28, color: "#f8fafc", dist: 54 },
  { id: 3179, name: "Schedar", designation: "Alpha Cassiopeiae", ra: 0.68, dec: 56.54, mag: 2.24, color: "#fed7aa", dist: 228 },
  { id: 4427, name: "Gamma Cas", designation: "Gamma Cassiopeiae", ra: 0.94, dec: 60.72, mag: 2.15, color: "#e0f2fe", dist: 610 },
  { id: 6686, name: "Ruchbah", designation: "Delta Cassiopeiae", ra: 1.43, dec: 60.23, mag: 2.68, color: "#ffffff", dist: 99 },
  { id: 8886, name: "Segin", designation: "Epsilon Cassiopeiae", ra: 1.90, dec: 63.67, mag: 3.35, color: "#e0f2fe", dist: 440 },

  // Pegasus
  { id: 113963, name: "Markab", designation: "Alpha Pegasi", ra: 23.08, dec: 15.20, mag: 2.49, color: "#ffffff", dist: 140 },
  { id: 112447, name: "Scheat", designation: "Beta Pegasi", ra: 23.06, dec: 28.08, mag: 2.44, color: "#fca5a5", dist: 200 },
  { id: 39, name: "Algenib", designation: "Gamma Pegasi", ra: 0.05, dec: 15.18, mag: 2.83, color: "#e0f2fe", dist: 330 },
  { id: 1067, name: "Alpheratz", designation: "Alpha Andromedae", ra: 0.13, dec: 29.09, mag: 2.06, color: "#e0f2fe", dist: 97 }, // shared with Andromeda

  // Andromeda
  { id: 3092, name: "Mirach", designation: "Beta Andromedae", ra: 1.16, dec: 35.62, mag: 2.07, color: "#fed7aa", dist: 200 },
  { id: 5447, name: "Almach", designation: "Gamma Andromedae", ra: 2.06, dec: 42.33, mag: 2.10, color: "#fef08a", dist: 350 },

  // Cassiopeia and others to complete lines
  { id: 3881, name: "Delta And", designation: "Delta Andromedae", ra: 0.65, dec: 30.86, mag: 3.27, color: "#fed7aa", dist: 101 },
  { id: 9640, name: "Adhil", designation: "Xi Andromedae", ra: 2.06, dec: 45.52, mag: 4.87, color: "#fef3c7", dist: 196 }
];

export const westernConstellations: Constellation[] = [
  {
    id: "Ori",
    name: "Orion",
    vnName: "Lạp Hộ (Thợ Săn)",
    lines: [
      [27989, 25336], // Betelgeuse to Bellatrix (shoulder)
      [25336, 25930], // Bellatrix to Mintaka
      [25930, 26311], // Mintaka to Alnilam (belt)
      [26311, 26727], // Alnilam to Alnitak
      [26727, 27366], // Alnitak to Saiph
      [27366, 24436], // Saiph to Rigel
      [24436, 25930], // Rigel to Mintaka
      [27989, 26727]  // Betelgeuse to Alnitak
    ]
  },
  {
    id: "UMa",
    name: "Ursa Major",
    vnName: "Đại Hùng (Gấu Lớn / Bắc Đẩu)",
    lines: [
      [54061, 53910], // Dubhe - Merak
      [53910, 58001], // Merak - Phecda
      [58001, 59774], // Phecda - Megrez
      [59774, 54061], // Megrez - Dubhe
      [59774, 62956], // Megrez - Alioth (tail start)
      [62956, 65378], // Alioth - Mizar
      [65378, 67301]  // Mizar - Alkaid
    ]
  },
  {
    id: "UMi",
    name: "Ursa Minor",
    vnName: "Tiểu Hùng (Gấu Nhỏ)",
    lines: [
      [11767, 82080], // Polaris - Yildun (just fake connections to look like minor spoon)
      [82080, 75097],
      [75097, 72607]
    ]
  },
  {
    id: "Cas",
    name: "Cassiopeia",
    vnName: "Thiên Hậu (Mẫu Hoàng)",
    lines: [
      [746, 3179],  // Caph - Schedar
      [3179, 4427], // Schedar - Gamma Cas
      [4427, 6686], // Gamma Cas - Ruchbah
      [6686, 8886]  // Ruchbah - Segin
    ]
  },
  {
    id: "Leo",
    name: "Leo",
    vnName: "Sư Tử",
    lines: [
      [49669, 50583], // Regulus - Algieba
      [50583, 54872], // Algieba - Zosma
      [54872, 57632], // Zosma - Denebola
      [57632, 54879], // Denebola - Chertan
      [54879, 49669]  // Chertan - Regulus
    ]
  },
  {
    id: "Cru",
    name: "Crux",
    vnName: "Nam Thập Tự",
    lines: [
      [60718, 62434], // Acrux - Gacrux (Vertical)
      [61084, 59747]  // Mimosa - Imai (Horizontal)
    ]
  },
  {
    id: "Sco",
    name: "Scorpius",
    vnName: "Thiên Yết (Thần Nông / Bọ Cạp)",
    lines: [
      [78401, 78820], // Acrab - Dschubba (head)
      [78820, 80112], // Dschubba - Antares (body)
      [80112, 86228], // Antares - Sargas
      [86228, 85927]  // Sargas - Shaula (tail)
    ]
  },
  {
    id: "Cyg",
    name: "Cygnus",
    vnName: "Thiên Nga",
    lines: [
      [102098, 100453], // Deneb - Sadr (body)
      [100453, 95947],  // Sadr - Albireo (neck)
      [100453, 102488], // Sadr - Gienah (wing right)
      [100453, 97165]   // Sadr - Fawaris (wing left)
    ]
  },
  {
    id: "Lyr",
    name: "Lyra",
    vnName: "Thiên Cầm (Đàn Lia)",
    lines: [
      [91262, 92420], // Vega - Sheliak
      [92420, 93194]  // Sheliak - Sulafat
    ]
  },
  {
    id: "Aql",
    name: "Aquila",
    vnName: "Thiên Ưng (Đại Bàng)",
    lines: [
      [97649, 98036], // Altair - Tarazed
      [97649, 97278]  // Altair - Alshain
    ]
  },
  {
    id: "Gem",
    name: "Gemini",
    vnName: "Song Tử",
    lines: [
      [36850, 37826], // Castor - Pollux
      [37826, 31681]  // Pollux - Alhena
    ]
  },
  {
    id: "And",
    name: "Andromeda",
    vnName: "Tiên Nữ",
    lines: [
      [1067, 3881], // Alpheratz - Delta And
      [3881, 3092], // Delta And - Mirach
      [3092, 5447], // Mirach - Almach
      [5447, 9640]  // Almach - Adhil
    ]
  }
];

export const vietnameseConstellations: Constellation[] = [
  {
    id: "TL_Giac",
    name: "Sao Giác",
    vnName: "Chòm Sao Giác (Sừng Rồng Thanh Long)",
    lines: [
      [65474, 61941], // Spica to Porrima
      [61941, 63608]  // Porrima to Vindemiatrix
    ]
  },
  {
    id: "TL_Tam",
    name: "Sao Tâm",
    vnName: "Chòm Sao Tâm (Tim Rồng Thanh Long)",
    lines: [
      [80112, 78820] // Antares - Dschubba
    ]
  },
  {
    id: "TL_Vi",
    name: "Sao Vĩ",
    vnName: "Chòm Sao Vĩ (Đuôi Rồng Thanh Long)",
    lines: [
      [86228, 85927] // Sargas - Shaula
    ]
  },
  {
    id: "BD_ThatTinh",
    name: "Bắc Đẩu Thất Tinh",
    vnName: "Chòm Sao Bắc Đẩu (Thất Tinh phương Bắc)",
    lines: [
      [54061, 53910],
      [53910, 58001],
      [58001, 59774],
      [59774, 54061],
      [59774, 62956],
      [62956, 65378],
      [65378, 67301]
    ]
  },
  {
    id: "BH_Sam",
    name: "Sao Sâm",
    vnName: "Chòm Sao Sâm (Lưng Hổ Bạch Hổ - Tây)",
    lines: [
      [27989, 25336], // Betelgeuse - Bellatrix
      [25336, 25930], // Bellatrix - Mintaka
      [25930, 26311], // Belt stars
      [26311, 26727],
      [26727, 27366],
      [27366, 24436],
      [24436, 25930]
    ]
  },
  {
    id: "CT_Tinh",
    name: "Sao Tinh",
    vnName: "Chòm Sao Tinh (Tim Chu Tước - Nam)",
    lines: [
      [32349, 37279] // Sirius to Procyon (representing dynamic southern connection)
    ]
  }
];

export const deepSkyObjects: DSO[] = [
  { id: "M31", name: "M31 Andromeda Galaxy", type: "galaxy", ra: 0.71, dec: 41.27, mag: 3.44, dist: 2537000, desc: "Thiên hà Tiên Nữ, thiên hà xoắn ốc khổng lồ gần Dải Ngân Hà nhất và đang lao về phía chúng ta." },
  { id: "M42", name: "M42 Orion Nebula", type: "nebula", ra: 5.58, dec: -5.38, mag: 4.0, dist: 1344, desc: "Tinh vân Orion, vườn ươm sao khổng lồ sáng nhất bầu trời đêm, có thể nhìn thấy bằng mắt thường." },
  { id: "M45", name: "M45 Pleiades (Tua Rua)", type: "cluster", ra: 3.78, dec: 24.1, mag: 1.6, dist: 444, desc: "Cụm sao mở Thất Nữ (sao Tua Rua), cụm sao nổi tiếng xuất hiện trong truyền thuyết của nhiều dân tộc trên thế giới." },
  { id: "M8", name: "M8 Lagoon Nebula", type: "nebula", ra: 18.06, dec: -24.38, mag: 6.0, dist: 4100, desc: "Tinh vân Đầm Lầy ở chòm Nhân Mã, một đám mây khí liên sao khổng lồ." },
  { id: "M16", name: "M16 Eagle Nebula", type: "nebula", ra: 18.31, dec: -13.82, mag: 6.0, dist: 5700, desc: "Tinh vân Đại Bàng, nơi chứa cấu trúc 'Trụ cột Sáng thế' (Pillars of Creation) cực kỳ nổi tiếng được James Webb chụp." }
];

export const planets: Planet[] = [
  { id: "sun", name: "Sun", vnName: "Mặt Trời", color: "#facc15", size: 14, desc: "Ngôi sao trung tâm của Hệ Mặt Trời." },
  { id: "moon", name: "Moon", vnName: "Mặt Trăng", color: "#cbd5e1", size: 10, desc: "Vệ tinh tự nhiên duy nhất của Trái Đất." },
  { id: "mercury", name: "Mercury", vnName: "Sao Thủy", color: "#94a3b8", size: 5, desc: "Hành tinh nhỏ nhất và gần Mặt Trời nhất." },
  { id: "venus", name: "Venus", vnName: "Sao Kim", color: "#fed7aa", size: 7, desc: "Hành tinh nóng nhất do hiệu ứng nhà kính dày đặc." },
  { id: "mars", name: "Mars", vnName: "Sao Hỏa", color: "#f87171", size: 6, desc: "Hành tinh đỏ rực, đối tượng nghiên cứu hàng đầu về sự sống ngoài Trái Đất." },
  { id: "jupiter", name: "Jupiter", vnName: "Sao Mộc", color: "#fdba74", size: 12, desc: "Gã khổng lồ khí, hành tinh lớn nhất trong Hệ Mặt Trời." },
  { id: "saturn", name: "Saturn", vnName: "Sao Thổ", color: "#fde047", size: 10, desc: "Hành tinh nổi tiếng với hệ vành đai băng đá tráng lệ." }
];
