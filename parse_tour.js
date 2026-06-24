import fs from 'fs';
const content = fs.readFileSync('../stellarium/scripts/BAS_Messier_Tour.ssc', 'utf-8');
const match = content.match(/var messierText = \[\s*([\s\S]*?)\s*\]/);
if (match) {
  const lines = match[1].split('\n').map(l => l.trim().replace(/^"/, '').replace(/",?$/, ''));
  const tour = lines.filter(l => l.length > 0).map(l => {
    const m = l.match(/^\[(.*?)\]\s*(.*)/);
    if (m) return { id: m[1], text: m[2] };
    return null;
  }).filter(Boolean);
  fs.writeFileSync('public/messier_tour.json', JSON.stringify(tour, null, 2));
  console.log('Wrote ' + tour.length + ' items');
} else {
  console.log('No match');
}
