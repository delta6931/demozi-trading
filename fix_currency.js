const fs = require('fs');
let content = fs.readFileSync('spare-parts-data.js', 'utf8');

// The replacement: match "Price: 123,45" then anything up to </p> and replace with "Price: 123,45 &euro;</p>"
content = content.replace(/<strong>Price:<\/strong>\s*([\d\.,]+)\s*[^<]+(<\/p>)/g, '<strong>Price:</strong> $1 &euro;$2');

fs.writeFileSync('spare-parts-data.js', content, 'utf8');
console.log('Fixed currency strings');
