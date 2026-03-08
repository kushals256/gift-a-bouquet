const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace references
    content = content.replace(/Digibouquet/g, 'gift a bouquet');
    content = content.replace(/p style={{ letterSpacing: '2px', fontSize: '0.8rem', textTransform: 'uppercase'/g, "p className=\"subtitle\" style={{");

    fs.writeFileSync(filePath, content);
});
console.log('Replaced text successfully.');
