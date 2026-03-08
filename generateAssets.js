const fs = require('fs');
const path = require('path');

const flowerDefs = [
    {
        id: 'f1', name: 'Pink Orchid',
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="53" cy="48" r="42" fill="#FFC0CB" opacity="0.5"/>
      <path d="M50 50 L25 20 Q50 5 75 20 Z" fill="#FFE4E1" stroke="#222" stroke-width="2" stroke-linejoin="round"/>
      <path d="M50 50 L10 45 Q10 25 25 30 Z" fill="#FFB6C1" stroke="#222" stroke-width="2" stroke-linejoin="round"/>
      <path d="M50 50 L90 45 Q90 25 75 30 Z" fill="#FFB6C1" stroke="#222" stroke-width="2" stroke-linejoin="round"/>
      <path d="M50 50 L35 85 Q50 95 65 85 Z" fill="#FF69B4" stroke="#222" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="50" cy="50" r="7" fill="#FFA500" stroke="#222" stroke-width="2"/>
    </svg>`
    },
    {
        id: 'f2', name: 'Orange Tulip',
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="48" cy="53" r="40" fill="#FFA500" opacity="0.6"/>
      <path d="M20 70 C 10 30, 30 10, 50 15 C 70 10, 90 30, 80 70 C 70 95, 30 95, 20 70 Z" fill="#FF8C00" stroke="#222" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M30 40 C 45 20, 60 20, 75 35" stroke="#222" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M40 25 C 50 15, 65 20, 65 30" stroke="#222" stroke-width="2" fill="none" stroke-linecap="round"/>
    </svg>`
    },
    {
        id: 'f3', name: 'Pink Carnation',
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="52" cy="50" r="45" fill="#FA8072" opacity="0.6"/>
      <path d="M50 50 L20 30 L25 15 L40 25 L50 8 L60 25 L75 15 L80 30 Z" fill="#F08080" stroke="#222" stroke-width="2" stroke-linejoin="round"/>
      <path d="M50 50 L80 30 L90 50 L80 70 L90 85 L75 80 L60 90 L50 75 Z" fill="#F08080" stroke="#222" stroke-width="2" stroke-linejoin="round"/>
      <path d="M50 50 L60 90 L50 95 L40 85 L25 95 L20 80 L10 70 L20 50 Z" fill="#F08080" stroke="#222" stroke-width="2" stroke-linejoin="round"/>
      <path d="M50 50 L20 50 L10 35 L25 25 L20 30 Z" fill="#F08080" stroke="#222" stroke-width="2" stroke-linejoin="round"/>
      <path d="M35 45 Q 50 35 65 45 Q 50 65 35 45 Z" fill="#FFA07A" stroke="#222" stroke-width="2"/>
    </svg>`
    },
    {
        id: 'f4', name: 'Blue Anemone',
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="52" r="46" fill="#87CEEB" opacity="0.7"/>
      <path d="M50 50 C20 10, 80 10, 50 50 Z" fill="#ADD8E6" stroke="#222" stroke-width="2" stroke-linejoin="round"/>
      <path d="M50 50 C90 20, 90 80, 50 50 Z" fill="#ADD8E6" stroke="#222" stroke-width="2" stroke-linejoin="round"/>
      <path d="M50 50 C80 90, 20 90, 50 50 Z" fill="#ADD8E6" stroke="#222" stroke-width="2" stroke-linejoin="round"/>
      <path d="M50 50 C10 80, 10 20, 50 50 Z" fill="#ADD8E6" stroke="#222" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="50" cy="50" r="14" fill="#483D8B" stroke="#222" stroke-width="2"/>
      <circle cx="50" cy="50" r="6" fill="#191970"/>
    </svg>`
    },
    {
        id: 'f5', name: 'Peach Peony',
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="48" cy="48" r="46" fill="#FFDAB9" opacity="0.8"/>
      <path d="M15 40 C 30 10, 70 10, 85 40 C 95 60, 75 90, 50 90 C 25 90, 5 60, 15 40 Z" fill="#FFE4B5" stroke="#222" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M25 45 C 40 25, 60 25, 75 45 C 80 60, 65 75, 50 75 C 35 75, 20 60, 25 45 Z" fill="#FFB6C1" stroke="#222" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M35 50 C 45 40, 55 40, 65 50 C 65 60, 55 65, 50 65 C 45 65, 35 60, 35 50 Z" fill="#FFA07A" stroke="#222" stroke-width="2" stroke-linejoin="round"/>
      <path d="M40 45 C 50 55, 60 45, 50 60 C 40 45, 50 55, 40 45 Z" fill="none" stroke="#222" stroke-width="1.5"/>
    </svg>`
    },
    {
        id: 'f6', name: 'Magenta Daisy',
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="52" cy="48" r="42" fill="#FF00FF" opacity="0.6"/>
      ${Array.from({ length: 18 }).map((_, i) => `<path d="M50 50 L50 8" transform="rotate(${i * 20} 50 50)" stroke="#222" stroke-width="3.5" stroke-linecap="round"/>`).join('')}
      ${Array.from({ length: 18 }).map((_, i) => `<path d="M50 50 L50 12" transform="rotate(${i * 20} 50 50)" stroke="#FF1493" stroke-width="5" stroke-linecap="round" opacity="0.9"/>`).join('')}
      <circle cx="50" cy="50" r="14" fill="#FFD700" stroke="#222" stroke-width="2"/>
    </svg>`
    },
    {
        id: 'f7', name: 'Red Camellia',
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="48" cy="52" r="45" fill="#FF6347" opacity="0.7"/>
      <circle cx="50" cy="50" r="40" fill="#DC143C" stroke="#222" stroke-width="1.5"/>
      <path d="M50 10 A 40 40 0 0 1 90 50 A 40 40 0 0 1 50 90 A 40 40 0 0 1 10 50 A 40 40 0 0 1 50 10" fill="none" stroke="#222" stroke-width="1.5"/>
      <circle cx="50" cy="50" r="28" fill="#B22222" stroke="#222" stroke-width="1.5"/>
      <circle cx="50" cy="50" r="16" fill="#8B0000" stroke="#222" stroke-width="2"/>
      <circle cx="50" cy="50" r="6" fill="#FF0000" stroke="#222" stroke-width="1.5"/>
    </svg>`
    },
    {
        id: 'f8', name: 'Yellow Sunflower',
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#FFD700" opacity="0.6"/>
      ${Array.from({ length: 16 }).map((_, i) => `<path d="M50 50 L58 10 L50 0 L42 10 Z" transform="rotate(${i * 22.5} 50 50)" fill="#FFC107" stroke="#222" stroke-width="1.5" stroke-linejoin="round"/>`).join('')}
      <circle cx="50" cy="50" r="26" fill="#A0522D" stroke="#222" stroke-width="2"/>
      <circle cx="50" cy="50" r="16" fill="#8B4513" stroke="#222" stroke-width="1" stroke-dasharray="2 2"/>
    </svg>`
    },
    {
        id: 'f9', name: 'Purple Lily',
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="53" cy="46" r="44" fill="#9370DB" opacity="0.5"/>
      ${[0, 60, 120, 180, 240, 300].map(a => `<path d="M50 50 Q65 25 50 5 Q35 25 50 50 Z" transform="rotate(${a} 50 50)" fill="#7B68EE" stroke="#222" stroke-width="2" stroke-linejoin="round"/>`).join('')}
      ${[30, 150, 270].map(a => `<path d="M50 50 L50 20" transform="rotate(${a} 50 50)" stroke="#222" stroke-width="1.5"/><circle cx="50" cy="20" r="2" transform="rotate(${a} 50 50)" fill="#FFD700" stroke="#222" stroke-width="1"/>`).join('')}
    </svg>`
    },
    {
        id: 'f10', name: 'White Daisy',
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="48" cy="50" r="42" fill="#E0FFFF" opacity="0.6"/>
      ${Array.from({ length: 14 }).map((_, i) => `<path d="M50 50 Q56 25 50 5 Q44 25 50 50 Z" transform="rotate(${i * 25.7} 50 50)" fill="#FFFFFF" stroke="#222" stroke-width="2" stroke-linejoin="round"/>`).join('')}
      <circle cx="50" cy="50" r="10" fill="#FFD700" stroke="#222" stroke-width="2"/>
    </svg>`
    },
    {
        id: 'f11', name: 'Pink Ranunculus',
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#FF69B4" opacity="0.7"/>
      <path d="M50 50 C 10 10, 30 15, 50 5 C 70 15, 90 10, 50 50 Z" fill="#FF1493" stroke="#222" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M50 50 C 90 10, 95 30, 95 50 C 95 70, 90 90, 50 50 Z" fill="#FF1493" stroke="#222" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M50 50 C 90 90, 70 85, 50 95 C 30 85, 10 90, 50 50 Z" fill="#DB7093" stroke="#222" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M50 50 C 10 90, 5 70, 5 50 C 5 30, 10 10, 50 50 Z" fill="#DB7093" stroke="#222" stroke-width="1.5" stroke-linejoin="round"/>
      <circle cx="50" cy="50" r="24" fill="#C71585" stroke="#222" stroke-width="1.5"/>
      <circle cx="50" cy="50" r="10" fill="#FFA500" stroke="#222" stroke-width="1.5"/>
    </svg>`
    },
    {
        id: 'f12', name: 'Dark Red Rose',
        svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="52" cy="48" r="45" fill="#8B0000" opacity="0.8"/>
      <path d="M50 5 C80 5, 95 35, 85 65 C75 95, 25 95, 15 65 C5 35, 20 5, 50 5 Z" fill="#B22222" stroke="#222" stroke-width="2" stroke-linejoin="round"/>
      <path d="M50 20 C70 20, 80 40, 70 60 C60 80, 40 80, 30 60 C20 40, 30 20, 50 20 Z" fill="#DC143C" stroke="#222" stroke-width="2" stroke-linejoin="round"/>
      <path d="M50 35 C60 35, 65 45, 60 55 C55 65, 45 60, 45 50 C45 40, 45 35, 50 35 Z" fill="#8B0000" stroke="#222" stroke-width="2" stroke-linejoin="round"/>
    </svg>`
    }
];

// The greenery backing needs to branch out from the bottom to form a bouquet structure.
const greeneryDefs = [
    {
        id: 'g1', name: 'Flowing Grass & Ferns',
        svg: `<svg viewBox="0 0 400 350" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMAX meet">
      <!-- Watercolor shadow base -->
      <path d="M200 350 Q 80 200 20 280 Q 200 150 200 350" fill="#228B22" opacity="0.5"/>
      <path d="M200 350 Q 320 200 380 280 Q 200 150 200 350" fill="#228B22" opacity="0.5"/>
      <path d="M200 350 Q 50 100 120 50 Q 200 200 200 350" fill="#2E8B57" opacity="0.7"/>
      <path d="M200 350 Q 350 100 280 50 Q 200 200 200 350" fill="#2E8B57" opacity="0.7"/>
      <path d="M200 350 L 200 20" stroke="#003500" stroke-width="15" fill="none" opacity="0.8"/>
      
      <!-- Structural leaf stems -->
      <path d="M200 350 Q 150 250 10 280" stroke="#111" stroke-width="4" stroke-linecap="round" fill="none"/>
      <path d="M200 350 Q 250 250 390 280" stroke="#111" stroke-width="4" stroke-linecap="round" fill="none"/>
      
      <path d="M200 350 Q 120 200 40 150" stroke="#111" stroke-width="5" stroke-linecap="round" fill="none"/>
      <path d="M200 350 Q 280 200 360 150" stroke="#111" stroke-width="5" stroke-linecap="round" fill="none"/>
      
      <path d="M200 350 Q 150 100 120 30" stroke="#111" stroke-width="6" stroke-linecap="round" fill="none"/>
      <path d="M200 350 Q 250 100 280 30" stroke="#111" stroke-width="6" stroke-linecap="round" fill="none"/>
      <path d="M200 350 Q 200 100 200 10" stroke="#111" stroke-width="7" stroke-linecap="round" fill="none"/>
      
      <!-- Fern/Grass fill colors along stems -->
      <path d="M200 350 Q 120 150 40 150 Q 160 250 200 350" fill="#006400" opacity="0.9"/>
      <path d="M200 350 Q 280 150 360 150 Q 240 250 200 350" fill="#006400" opacity="0.9"/>
      
      <path d="M200 350 Q 140 100 120 30 L 150 150 Z" fill="#228B22" opacity="0.9"/>
      <path d="M200 350 Q 260 100 280 30 L 250 150 Z" fill="#228B22" opacity="0.9"/>
      
      <!-- Lilac/Pink wisps like in the user's reference image -->
      <path d="M200 350 Q 100 250 20 200" stroke="#DDA0DD" stroke-width="4" stroke-linecap="round" fill="none"/>
      <path d="M200 350 Q 300 250 380 200" stroke="#DDA0DD" stroke-width="4" stroke-linecap="round" fill="none"/>
      <path d="M200 350 Q 120 150 80 80" stroke="#DDA0DD" stroke-width="5" stroke-linecap="round" fill="none"/>
      <path d="M200 350 Q 280 150 320 80" stroke="#DDA0DD" stroke-width="5" stroke-linecap="round" fill="none"/>
      <path d="M200 350 Q 160 150 100 50" stroke="#DDA0DD" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M200 350 Q 240 150 300 50" stroke="#DDA0DD" stroke-width="3" stroke-linecap="round" fill="none"/>
    </svg>`
    },
    {
        id: 'g2', name: 'Dark Green Fan',
        svg: `<svg viewBox="0 0 400 350" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMAX meet">
      <path d="M200 350 C 150 200, 20 200, 10 100 C 100 150, 180 250, 200 350 Z" fill="#004d00" stroke="#111" stroke-width="3" opacity="0.9"/>
      <path d="M200 350 C 250 200, 380 200, 390 100 C 300 150, 220 250, 200 350 Z" fill="#004d00" stroke="#111" stroke-width="3" opacity="0.9"/>
      <path d="M200 350 C 150 150, 80 100, 80 20 C 120 100, 180 200, 200 350 Z" fill="#006400" stroke="#111" stroke-width="4" opacity="0.9"/>
      <path d="M200 350 C 250 150, 320 100, 320 20 C 280 100, 220 200, 200 350 Z" fill="#006400" stroke="#111" stroke-width="4" opacity="0.9"/>
      <path d="M200 350 L 150 10 L 180 150 Z" fill="#228B22" stroke="#111" stroke-width="3" />
      <path d="M200 350 L 250 10 L 220 150 Z" fill="#228B22" stroke="#111" stroke-width="3" />
    </svg>`
    }
];

const fileContent = `// Auto-generated premium hand-drawn style assets
export const FLOWER_ASSETS = ${JSON.stringify(flowerDefs, null, 2)};
export const GREENERY_ASSETS = ${JSON.stringify(greeneryDefs, null, 2)};
`;

fs.writeFileSync('src/data/assets.js', fileContent);
console.log('Successfully updated assets.js');
