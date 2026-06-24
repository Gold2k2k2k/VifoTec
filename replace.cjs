const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf-8');
const temp = fs.readFileSync('src/layout-temp.tsx', 'utf-8');

// Find the index of "return (" which starts the render block
const match = app.match(/  return \(\s*<div className="flex flex-col h-screen w-screen/);
if (!match) {
  console.error("Return statement not found!");
  process.exit(1);
}

const startIdx = match.index;
const part1 = app.substring(0, startIdx);

// Append the new layout temp and then close the function and export
fs.writeFileSync('src/App.tsx', part1 + temp + '\nexport default App;\n');
console.log("Replaced successfully!");
