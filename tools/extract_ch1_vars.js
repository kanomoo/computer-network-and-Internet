const fs = require('fs');
const data = JSON.parse(fs.readFileSync('tools/ch1_full_dump.json', 'utf8'));
const script = data.scripts[0];

// Extract all const definitions with regex
const varMatches = script.match(/(?:const|let|var)\s+([a-zA-Z0-9_]+)\s*=\s*(\[[\s\S]*?\]|\{[\s\S]*?\});/g) || [];
console.log(`Found ${varMatches.length} variable declarations`);

fs.writeFileSync('tools/ch1_js_vars.js', varMatches.join('\n\n'));
console.log('Saved tools/ch1_js_vars.js');
