import fs from 'fs';

const stellariumTours = {};

// 1. Messier Tour
const messierContent = fs.readFileSync('../stellarium/scripts/BAS_Messier_Tour.ssc', 'utf-8');
const messierMatches = [...messierContent.matchAll(/\"\[(M\d+)\]\s*([^\"]+)\"/g)];
stellariumTours['messier'] = {
  id: 'messier',
  name: 'Tour Các Thiên Thể Messier (Stellarium)',
  description: 'Tham quan 110 thiên thể Messier tuyệt đẹp.',
  steps: messierMatches.map(m => ({ target: m[1], label: m[2] }))
};

// 2. Planets Tour
stellariumTours['planets'] = {
  id: 'planets',
  name: 'Tour Hệ Mặt Trời (Stellarium)',
  description: 'Ghé thăm các hành tinh trong Hệ Mặt Trời.',
  steps: [
    { target: "Sun", label: "Mặt Trời - Ngôi sao trung tâm" },
    { target: "Mercury", label: "Sao Thủy" },
    { target: "Venus", label: "Sao Kim" },
    { target: "Moon", label: "Mặt Trăng" },
    { target: "Mars", label: "Sao Hỏa" },
    { target: "Jupiter", label: "Sao Mộc" },
    { target: "Saturn", label: "Sao Thổ" },
    { target: "Uranus", label: "Sao Thiên Vương" },
    { target: "Neptune", label: "Sao Hải Vương" }
  ]
};

// 3. Constellations Tour
const constContent = fs.readFileSync('../stellarium/scripts/common_objects.inc', 'utf-8');
const constMatch = constContent.match(/var constellations = new Array\(([\s\S]*?)\);/);
if (constMatch) {
  const cNames = constMatch[1].split(',').map(s => s.trim().replace(/"/g, '').replace(/\n/g, ''));
  stellariumTours['constellations'] = {
    id: 'constellations',
    name: 'Tour Các Chòm Sao (Stellarium)',
    description: 'Chuyến tham quan các chòm sao chuẩn IAU.',
    steps: cNames.map(c => ({ target: c, label: 'Chòm sao ' + c }))
  };
}

fs.writeFileSync('src/stellarium_tours.ts', 'export const STELLARIUM_TOURS = ' + JSON.stringify(stellariumTours, null, 2) + ';');
console.log('Generated stellarium_tours.ts');
