import fs from 'fs';
const txt = fs.readFileSync('../stellarium/scripts/BAS_Messier_Tour.ssc', 'utf-8');
const matches = [...txt.matchAll(/\"\[(M\d+)\]\s*([^\"]+)\"/g)];
const out = matches.map(m => ({id: m[1], text: m[2]}));
fs.writeFileSync('public/messier_tour.json', JSON.stringify(out, null, 2));
console.log('Wrote ' + out.length + ' items');
