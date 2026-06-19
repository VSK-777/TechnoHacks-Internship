const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
  { regex: /bg-\[#0a0a0f\]/g, replacement: 'bg-slate-50' },
  { regex: /bg-\[#0d0d14\]/g, replacement: 'bg-white' },
  { regex: /text-white/g, replacement: 'text-slate-900' },
  { regex: /text-gray-400/g, replacement: 'text-slate-500' },
  { regex: /text-gray-300/g, replacement: 'text-slate-600' },
  { regex: /text-gray-500/g, replacement: 'text-slate-400' },
  { regex: /border-white\/5/g, replacement: 'border-slate-200' },
  { regex: /border-white\/10/g, replacement: 'border-slate-200' },
  { regex: /bg-white\/5/g, replacement: 'bg-slate-100' },
  { regex: /bg-white\/10/g, replacement: 'bg-slate-200' },
  { regex: /bg-white\/20/g, replacement: 'bg-slate-300' },
  { regex: /bg-white\/\[0\.02\]/g, replacement: 'bg-white' },
  { regex: /bg-white\/\[0\.01\]/g, replacement: 'bg-slate-50' },
  { regex: /hover:text-white/g, replacement: 'hover:text-slate-900' },
  { regex: /hover:bg-white\/5/g, replacement: 'hover:bg-slate-100' },
  { regex: /hover:bg-white\/10/g, replacement: 'hover:bg-slate-200' },
  { regex: /bg-black\/40/g, replacement: 'bg-white' },
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      if (fullPath.endsWith('index.css')) {
         content = content.replace(/background-color:\s*#0F172A;/g, 'background-color: #F8FAFC;');
         content = content.replace(/color:\s*#F8FAFC;/g, 'color: #0F172A;');
         content = content.replace(/background:\s*#0F172A;/g, 'background: #F8FAFC;');
         content = content.replace(/background:\s*#334155;/g, 'background: #CBD5E1;');
         content = content.replace(/background:\s*#475569;/g, 'background: #94A3B8;');
      }

      // Avoid touching specific files that might need custom colors like gradient texts
      // Actually we will apply replacements but selectively.
      for (const { regex, replacement } of replacements) {
        content = content.replace(regex, replacement);
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(srcDir);
console.log('Done!');
