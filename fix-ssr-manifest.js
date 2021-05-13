const fs = require('fs');
const manifest = require('./dist/tmp/ssr-manifest.json');

for (const path in manifest) {
  manifest[path] = manifest[path].filter(f => !f.includes('-legacy'));
}

fs.writeFileSync('./dist/tmp/ssr-manifest.json', JSON.stringify(manifest, null, 2));
