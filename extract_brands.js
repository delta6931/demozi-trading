const fs = require('fs');
function getB(t) {
    let b = new Set();
    let r = /brand:\s*["']([^"']+)["']/g;
    let m;
    while ((m = r.exec(t)) !== null) b.add(m[1].trim());
    return Array.from(b);
}
let s = getB(fs.readFileSync('spare-parts-data.js', 'utf8'));
let p = getB(fs.readFileSync('products-data.js', 'utf8'));
let all = [...new Set([...s, ...p])].sort();
console.log(JSON.stringify(all));
